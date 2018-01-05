import { BadRequestException, createRouteParamDecorator } from '@nestjs/common';
import { Request } from 'express';
import * as mime from 'mime-types';
import * as multer from 'multer';
import * as path from 'path';
import * as uuid from 'uuid';
import * as _ from 'lodash';

/**
 * Injects all uploaded files.
 * Must be applied on a controller method parameter.
 */
export const Files = createRouteParamDecorator(
  async (args: string | { fieldName: string; multerOptions: multer.Options }, request: Request) => {
    const extensionAllowed: any = ['jpg', 'png', 'jpeg'];
    const defaultDestination = path.resolve('.', 'public', 'uploads');
    const defaultMulterOptions: multer.Options = {
      dest: defaultDestination,
      limits: {
        files: 5, // max number of files
        fileSize: 5 * 10 * 10 * 10 * 10 * 10 * 10 // 5 mb in bytes
      },
      storage: multer.diskStorage({
        destination: (req, file, cb) => cb(null, defaultDestination),
        filename: (req, file, cb) => cb(null, `${uuid.v4().replace(/-/g, '')}.${mime.extension(file.mimetype)}`)
      }),
      fileFilter: (req: Request, file, cb) => {
        if (!extensionAllowed.includes(mime.extension(file.mimetype))) {
          return cb(new Error('Extension not allowed'), null);
        }

        const { tw, th, sw, sh, mw, mh, lw, lh } = req.query;

        const maxDimension = { tw: 2000, th: 2000, sw: 2000, sh: 2000, mw: 2000, mh: 2000, lw: 2000, lh: 2000 };
        const newDimension = {
          ...maxDimension,
          tw: +tw || 50,
          th: +th || 50,
          sw: +sw || 300,
          sh: +sh || 150,
          mw: +mw || 600,
          mh: +mh || 300,
          lw: +lw || 1000,
          lh: +lh || 500
        };

        console.log('newDimension', newDimension);

        req.query = newDimension;

        const failedKeys = _(newDimension)
          .map((v, k) => (v > maxDimension[k] ? k : undefined))
          .compact()
          .value();

        return failedKeys.length > 0
          ? cb(new Error(`${failedKeys.join(', ')} in query params are not acceptable.`), null)
          : cb(null, true);
      }
    };
    args =
      typeof args === 'string'
        ? { fieldName: args, multerOptions: defaultMulterOptions }
        : { fieldName: 'files', multerOptions: defaultMulterOptions, ...args };
    const upload = multer(args.multerOptions).any();
    return new Promise((resolve, reject) => {
      upload(request, null, err => {
        if (err) return reject(new BadRequestException(err.message));
        return resolve(request.files);
      });
    });
  }
);

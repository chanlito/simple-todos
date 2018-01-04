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

        const defaultDimension = { tw: 20, th: 50, sw: 40, sh: 100, mw: 80, mh: 200, lw: 160, lh: 400 };
        const newDimension = { ...defaultDimension, ...req.query };

        req.query = newDimension;

        const failedKeys = _(newDimension)
          .map((v, k) => (v > defaultDimension[k] ? k : undefined))
          .compact()
          .value();

        return failedKeys.length > 0 ? cb(new Error(`${failedKeys.join(', ')} in query params are not acceptable.`), null) : cb(null, true);
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

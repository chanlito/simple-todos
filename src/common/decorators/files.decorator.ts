import { BadRequestException, createRouteParamDecorator } from '@nestjs/common';
import { Request } from 'express';
import * as mime from 'mime-types';
import * as multer from 'multer';
import * as path from 'path';
import * as uuid from 'uuid';

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
      fileFilter: (req, file, cb) => {
        extensionAllowed.includes(mime.extension(file.mimetype)) ? cb(null, true) : cb(new Error('Extension not allowed'), null)
      } // allow any files to be uploaded // TODO:
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

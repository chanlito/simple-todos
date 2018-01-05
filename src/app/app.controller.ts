import { Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { createReadStream, createWriteStream } from 'fs';
import * as _ from 'lodash';
import * as sharp from 'sharp';

import { Files } from '../common';

@Controller()
export class AppController {
  @Get()
  async index() {
    return 'Simple Todos';
  }

  @Post('images')
  async uploadImage(@Files() files: Express.Multer.File[], @Req() req: Request) {
    const { tw, th, sw, sh, mw, mh, lw, lh } = req.query;
    return Promise.all(
      _(files)
        .map(({ path }) => {
          return [
            this.resizeImage(path, path.replace('.', '_t.'), { w: tw, h: th }),
            this.resizeImage(path, path.replace('.', '_s.'), { w: sw, h: sh }),
            this.resizeImage(path, path.replace('.', '_m.'), { w: mw, h: mh }),
            this.resizeImage(path, path.replace('.', '_l.'), { w: lw, h: lh })
          ];
        })
        .flatten()
        .value()
    );
  }

  private resizeImage(
    src: string,
    dest: string,
    options: {
      w: number;
      h: number;
      quality?: number;
    }
  ) {
    return new Promise((resolve, reject) => {
      const readableStream = createReadStream(src);
      const writableStream = createWriteStream(dest);
      readableStream
        .pipe(
          sharp()
            .resize(options.w, options.h)
            .on('end', () => resolve(dest))
            .on('error', e => reject(e))
        )
        .pipe(writableStream);
    });
  }
}

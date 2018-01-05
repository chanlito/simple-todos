import { Controller, Get, Post, Req } from '@nestjs/common';
import * as Promises from 'bluebird';
import { Request } from 'express';
import { createReadStream, createWriteStream } from 'fs';
import * as gm from 'gm';
import * as _ from 'lodash';
import * as sharp from 'sharp';

import { Files } from '../common';

Promises.promisifyAll(gm.prototype);

@Controller()
export class AppController {
  @Get()
  async index(): Promise<string> {
    return 'Hello World!';
  }

  @Post('images')
  async uploadImage(@Files() files: Express.Multer.File[], @Req() req: Request) {
    const { tw, th, sw, sh, mw, mh, lw, lh } = req.query;
    console.log('query', req.query);

    return Promise.all(
      _(files)
        .map(({ path }) => {
          return [
            this.sharpResizeImage(path, path.replace('.', '_t.'), { w: tw, h: th }),
            this.sharpResizeImage(path, path.replace('.', '_s.'), { w: sw, h: sh }),
            this.sharpResizeImage(path, path.replace('.', '_m.'), { w: mw, h: mh }),
            this.sharpResizeImage(path, path.replace('.', '_l.'), { w: lw, h: lh })
          ];
        })
        .flatten()
        .value()
    );
  }

  private sharpResizeImage(
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

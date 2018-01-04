import { Controller, Get, Post, Query } from '@nestjs/common';
import * as Promises from 'bluebird';
import * as gm from 'gm';
import * as _ from 'lodash';

import { Files } from '../common';

Promises.promisifyAll(gm.prototype);

@Controller()
export class AppController {
  @Get()
  async index(): Promise<string> {
    return 'Hello World!';
  }

  @Post('images')
  async uploadImage(@Files() files: Express.Multer.File[], @Query() query) {
    const { tw = 20, th = 50, sw = 40, sh = 100, mw = 80, mh = 200, lw = 160, lh = 400 } = query;

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
      gm(src)
        .resize(options.w, options.h)
        .quality(options.quality || 90)
        .write(dest, err => {
          if (err) return reject(err);
          resolve(dest);
        });
    });
  }
}

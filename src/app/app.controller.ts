import { Controller, Get, Post, Query } from '@nestjs/common';
import * as Promises from 'bluebird';
import * as gm from 'gm';

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
    // TODO: resizing
    files.map(({ path }) => {
      gm(path)
        .resize(tw, th)
        .quality(90)
        .writeAsync(path.replace('.', '_t.')),
        gm(path)
          .resize(sw, sh)
          .quality(90)
          .writeAsync(path.replace('.', '_s.')),
        gm(path)
          .resize(mw, mh)
          .quality(90)
          .writeAsync(path.replace('.', '_m.')),
        gm(path)
          .resize(lw, lh)
          .quality(90)
          .writeAsync(path.replace('.', '_l.'));
    });
    return files;
  }
}

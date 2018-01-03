import { Controller, Get, Post } from '@nestjs/common';

import { Files } from '../common';

@Controller()
export class AppController {
  @Get()
  async index(): Promise<string> {
    return 'Hello World!';
  }

  @Post('images')
  async uploadImage(@Files() files: Express.Multer.File[]) {
    return files;
  }
}

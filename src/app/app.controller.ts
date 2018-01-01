import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  async index(): Promise<string> {
    return 'Hello World!';
  }
}

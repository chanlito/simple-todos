import { DynamicModule, Global, Module } from '@nestjs/common';

import { CreateMailerProviders, createMailerProviders } from './mailer.providers';

@Global()
@Module({})
export class MailerModule {
  static forRoot(options: CreateMailerProviders): DynamicModule {
    const providers = createMailerProviders(options);
    return {
      module: MailerModule,
      components: providers,
      exports: providers
    };
  }
}

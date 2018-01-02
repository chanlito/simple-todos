import { DynamicModule, Global, Module } from '@nestjs/common';

import { MailerConfiguration } from './mailer';
import { createMailerProviders } from './mailer.providers';

@Global()
@Module({})
export class MailerModule {
  static forRoot(options: MailerConfiguration): DynamicModule {
    const providers = createMailerProviders(options);
    return {
      module: MailerModule,
      components: providers,
      exports: providers
    };
  }
}

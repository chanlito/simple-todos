import 'dotenv/config';
import 'reflect-metadata';
import 'source-map-support/register';

import { ApplicationModule } from '../src/app/app.module';
import { uniqueEmail } from '../src/common/rules/unique-email.rule';
import { Startup } from '../src/lib/startup';

export async function getServer() {
  if (!(global as any).__TEST_SERVER__) {
    const { app, server } = await new Startup({
      ApplicationModule,
      indicative: {
        defaultMessages: {
          email: 'The {{field}} field is not valid.',
          integer: 'The {{field}} field must be an integer.',
          required: 'The {{field}} field is required.',
          string: 'The {{field}} field must be a string.'
        },
        customRules: {
          uniqueEmail
        }
      }
    }).main();
    await app.init();
    (global as any).__TEST_SERVER__ = server;
  }
  return (global as any).__TEST_SERVER__;
}

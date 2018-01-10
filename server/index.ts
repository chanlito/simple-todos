import 'dotenv/config';
import 'reflect-metadata';
import 'source-map-support/register';

import { WsException } from '@nestjs/websockets';

import { ApplicationModule } from './app/app.module';
import { authorizationChecker } from './app/auth/auth.resolver';
import { uniqueEmail } from './common/rules';
import { Startup, StartupConfiguration } from './startup';

const { PORT = 4200 } = process.env;

const config: StartupConfiguration = {
  ApplicationModule,
  authorizationChecker,
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
};

new Startup(config).main().then(
  async ({ app, nuxt }) => {
    await app.listen(+PORT);
    app.use(nuxt.render);
  },
  e => {
    console.error(e);
    process.exit(1);
  }
);

process.on('unhandledRejection', e => {
  if (e instanceof WsException) {
    console.error(`[WsException]`, e.getError());
  } else {
    console.error(`[UnhandledRejection]`, e);
  }
});

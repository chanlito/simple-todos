import 'dotenv/config';
import 'reflect-metadata';
import 'source-map-support/register';

import { ApplicationModule } from './app/app.module';
import { uniqueEmail } from './common/rules';
import { Startup, StartupConfiguration } from './lib/startup';

const { PORT = 4200 } = process.env;

const config: StartupConfiguration = {
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
};

new Startup(config).main().then(
  ({ app }) => {
    app.listen(+PORT);
  },
  e => {
    console.error(e);
    process.exit(1);
  }
);

import 'dotenv/config';
import 'reflect-metadata';
import 'source-map-support/register';

import { ApplicationModule } from './app/app.module';
import { Startup, StartupConfiguration } from './lib/startup';

const { PORT = 4200 } = process.env;

const config: StartupConfiguration = {
  ApplicationModule
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

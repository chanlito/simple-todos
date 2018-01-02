import 'dotenv/config';
import 'reflect-metadata';
import 'source-map-support/register';

import { ApplicationModule } from '../src/app/app.module';
import { Startup } from '../src/lib/startup';

(global as any).__TEST_SERVER__;

export async function getServer() {
  if (!(global as any).__TEST_SERVER__) {
    const { app, server } = await new Startup({ ApplicationModule }).main();
    await app.init();
    (global as any).__TEST_SERVER__ = server;
  }
  return (global as any).__TEST_SERVER__;
}

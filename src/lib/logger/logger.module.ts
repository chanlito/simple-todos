import { Global, Module } from '@nestjs/common';

import { loggerProviders } from './logger.providers';

@Global()
@Module({
  components: [...loggerProviders],
  exports: [...loggerProviders]
})
export class LoggerModule {}

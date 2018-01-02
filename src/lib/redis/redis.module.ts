import { DynamicModule, Global, Module } from '@nestjs/common';

import { createRedisProviders, CreateRedisProvidersOptions } from './redis.providers';

@Global()
@Module({})
export class RedisModule {
  static forRoot(options: CreateRedisProvidersOptions): DynamicModule {
    const providers = createRedisProviders(options);
    return {
      module: RedisModule,
      components: providers,
      exports: providers
    };
  }
}

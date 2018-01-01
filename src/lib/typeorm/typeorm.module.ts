import { DynamicModule, Global, Module } from '@nestjs/common';

import { CreateTypeOrmProviders, createTypeOrmProviders } from './typeorm.providers';

@Global()
@Module({})
export class TypeOrmModule {
  static forRoot(options: CreateTypeOrmProviders): DynamicModule {
    (options.connectionOptions as any).entities = options.entities;
    const providers = createTypeOrmProviders(options);
    return {
      module: TypeOrmModule,
      components: providers,
      exports: providers
    };
  }
}

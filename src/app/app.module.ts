import { Module } from '@nestjs/common';

import * as entities from '../entity';
import { LoggerModule } from '../lib/logger';
import { RedisModule } from '../lib/redis/redis.module';
import { TypeOrmModule } from '../lib/typeorm';
import * as repositories from '../repository';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { TodoModule } from './todo/todo.module';

const {
  REDIS_HOST,
  REDIS_PORT,
  REDIS_AUTH_PASS,
  TYPEORM_CONNECTION,
  TYPEORM_HOST,
  TYPEORM_PORT,
  TYPEORM_SCHEMA,
  TYPEORM_USERNAME,
  TYPEORM_PASSWORD,
  TYPEORM_LOGGING
} = process.env as any;

@Module({
  modules: [
    AuthModule,
    TodoModule,
    LoggerModule,
    RedisModule.forRoot({
      host: REDIS_HOST,
      port: REDIS_PORT,
      auth_pass: REDIS_AUTH_PASS
    }),
    TypeOrmModule.forRoot({
      entities: Object.keys(entities).map(i => entities[i]),
      customRepositories: Object.keys(repositories).map(i => repositories[i]),
      connectionOptions: {
        host: TYPEORM_HOST,
        port: TYPEORM_PORT,
        database: TYPEORM_SCHEMA,
        username: TYPEORM_USERNAME,
        password: TYPEORM_PASSWORD,
        type: TYPEORM_CONNECTION,
        logging: !!TYPEORM_LOGGING,
        synchronize: false
      }
    })
  ],
  controllers: [AppController]
})
export class ApplicationModule {}

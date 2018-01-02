import { Module } from '@nestjs/common';

import * as entities from '../entity';
import { LoggerModule } from '../lib/logger';
import { MailerModule } from '../lib/mailer';
import { RedisModule } from '../lib/redis/redis.module';
import { TypeOrmModule } from '../lib/typeorm';
import * as repositories from '../repository';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { TodoModule } from './todo/todo.module';

const {
  MAILER_TYPE,
  MAILER_ETHEREAL_USERNAME,
  MAILER_ETHEREAL_PASSWORD,
  MAILER_GMAIL_CLIENTID,
  MAILER_GMAIL_CLIENTSECRET,
  MAILER_GMAIL_REFRESHTOKEN,
  MAILER_GMAIL_USER,
  MAILER_MANDRILL_API_KEY,
  REDIS_HOST,
  REDIS_PORT,
  REDIS_AUTH_PASS,
  TYPEORM_CONNECTION,
  TYPEORM_HOST,
  TYPEORM_PORT,
  TYPEORM_SCHEMA,
  TYPEORM_USERNAME,
  TYPEORM_PASSWORD,
  TYPEORM_LOGGING,
  TYPEORM_SYNCHRONIZE
} = process.env as any;

@Module({
  modules: [
    AuthModule,
    TodoModule,
    LoggerModule,
    MailerModule.forRoot({
      type: MAILER_TYPE,
      ethreal: {
        username: MAILER_ETHEREAL_USERNAME,
        password: MAILER_ETHEREAL_PASSWORD
      },
      gmail: {
        clientId: MAILER_GMAIL_CLIENTID,
        clientSecret: MAILER_GMAIL_CLIENTSECRET,
        refreshToken: MAILER_GMAIL_REFRESHTOKEN,
        user: MAILER_GMAIL_USER
      },
      mandrill: { apiKey: MAILER_MANDRILL_API_KEY }
    }),
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
        logging: TYPEORM_LOGGING === 'true',
        synchronize: TYPEORM_SYNCHRONIZE === 'true'
      }
    })
  ],
  controllers: [AppController]
})
export class ApplicationModule {}

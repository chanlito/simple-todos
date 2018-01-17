import { Global, Module } from '@nestjs/common';
import { LoggerModule, MailerModule, RedisModule, SequelizeModule, TypeOrmModule } from 'nestjs-extensions';
import { resolve as pathResolve } from 'path';

import * as entities from '../entity';
import * as models from '../model';
import * as repositories from '../repository';
import { AppController } from './app.controller';
import { ApplicationGateway } from './app.gateway';
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

@Global()
@Module({
  modules: [
    AuthModule,
    TodoModule,
    LoggerModule.forRoot({
      types: ['console', 'files'],
      directory: pathResolve('.', 'logs')
    }),
    MailerModule.forRoot({
      type: MAILER_TYPE,
      ethereal: {
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
    SequelizeModule.forRoot({
      config: {
        host: TYPEORM_HOST,
        port: TYPEORM_PORT,
        database: TYPEORM_SCHEMA,
        username: TYPEORM_USERNAME,
        password: TYPEORM_PASSWORD,
        dialect: TYPEORM_CONNECTION,
        logging: TYPEORM_LOGGING === 'true' ? console.log : false
      },
      useCLS: true,
      models: Object.keys(models).map(i => models[i])
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
  controllers: [AppController],
  components: [ApplicationGateway],
  exports: [ApplicationGateway]
})
export class ApplicationModule {}

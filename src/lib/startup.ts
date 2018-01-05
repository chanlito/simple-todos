import { INestApplication } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cors from 'cors';
import * as express from 'express';
import * as morgan from 'morgan';
import { IndicativePipe, IndicativePipeConfiguration } from 'nestjs-extensions';

import { AuthGuard, authorizationChecker, AuthorizationCheckerFn } from './auth';
import { ErrorFilter } from './error';

export class Startup {
  private reflector = new Reflector();

  constructor(private config: StartupConfiguration) {}

  async main() {
    const server = express();
    await this.configureExpressSettings(server);
    await this.configureExpressMiddleware(server);

    const app = await NestFactory.create(this.config.ApplicationModule, server);
    await this.configureNestGlobals(app);
    await this.configureNestSwagger(app);
    return { app, server };
  }

  private async configureExpressSettings(app: express.Application) {
    app.set('etag', false);
    app.set('trust proxy', true);
    app.set('x-powered-by', false);
  }

  private async configureExpressMiddleware(app: express.Application) {
    app.use(morgan('dev'));
    app.use(cors({ origin: true }));
  }

  private async configureNestGlobals(app: INestApplication) {
    app.useGlobalPipes(new IndicativePipe(this.config.indicative, this.reflector));
    app.useGlobalFilters(new ErrorFilter());
    app.useGlobalGuards(new AuthGuard(this.config.authorizationChecker || authorizationChecker, this.reflector));
  }

  private async configureNestSwagger(app: INestApplication) {
    const options = new DocumentBuilder()
      .setTitle('Simple Todos')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('/docs', app, document);
  }
}

export interface StartupConfiguration {
  ApplicationModule: any;
  authorizationChecker?: AuthorizationCheckerFn;
  indicative?: IndicativePipeConfiguration;
}

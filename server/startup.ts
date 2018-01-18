import { INestApplication } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cors from 'cors';
import * as express from 'express';
import * as morgan from 'morgan';
import {
  ApplicationExceptionFilter,
  AuthGuard,
  AuthorizationCheckerFn,
  IndicativePipe,
  IndicativePipeConfiguration
} from 'nestjs-extensions';
import { Builder, Nuxt } from 'nuxt';

const session = require('cookie-session');
const nuxtConfig = require('../nuxt.config');

export class Startup {
  private reflector = new Reflector();

  constructor(private config: StartupConfiguration) {}

  static async configureNuxt() {
    nuxtConfig.dev = process.env.NODE_ENV !== 'production';
    return new Nuxt(nuxtConfig);
  }

  static async configureNuxtBuilder(nuxt) {
    return new Builder(nuxt).build();
  }

  async main() {
    const server = express();
    await this.configureExpressSettings(server);
    await this.configureExpressMiddleware(server);

    const app = await NestFactory.create(this.config.ApplicationModule, server);
    app.setGlobalPrefix('api');
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
    app.use(cors({ origin: true, credentials: true,  }));
    app.use(
      session({
        name: '__session',
        keys: [process.env.SECRET, 'no-keys'],
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        httpOnly: true
      })
    );
  }

  private async configureNestGlobals(app: INestApplication) {
    app.useGlobalPipes(new IndicativePipe(this.config.indicative, this.reflector));
    app.useGlobalFilters(new ApplicationExceptionFilter());
    if (this.config.authorizationChecker) {
      app.useGlobalGuards(new AuthGuard(this.config.authorizationChecker, this.reflector));
    }
  }

  private async configureNestSwagger(app: INestApplication) {
    const options = new DocumentBuilder()
      .setBasePath('/api')
      .setTitle('Simple Todos')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('/api/docs', app, document);
  }
}

export interface StartupConfiguration {
  ApplicationModule: any;
  authorizationChecker?: AuthorizationCheckerFn;
  indicative?: IndicativePipeConfiguration;
}

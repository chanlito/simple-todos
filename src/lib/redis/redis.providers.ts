import { Logger } from '@nestjs/common';
import * as Promise from 'bluebird';
import * as redis from 'redis';

import { RedisClientToken } from './redis.constants';

Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

const logger = new Logger('RedisModule');

export function createRedisProviders(options: CreateRedisProvidersOptions) {
  const redisProvider = {
    provide: RedisClientToken,
    useFactory: () => {
      const redisClient = redis.createClient({
        host: options.host,
        port: options.port,
        auth_pass: options.auth_pass
      });
      redisClient.on('connect', () => logger.log('Connecting'));
      redisClient.on('ready', () => logger.log('Connected'));
      redisClient.on('reconnecting', () => logger.log('Reconnecting'));
      redisClient.on('end', () => logger.warn('Ended'));
      redisClient.on('error', e => logger.error(e.message, e.stack));
      return redisClient;
    }
  };
  return [redisProvider];
}

export interface CreateRedisProvidersOptions {
  host: string;
  port: number;
  auth_pass: string;
}

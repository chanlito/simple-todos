import { ParseBooleanPipe } from './pipes/parse-boolean.pipe';
import { ParseNumberPipe } from './pipes/parse-number.pipe';

export * from './decorators/files.decorator';
export { Validate } from '../lib/indicative';
export { AuthUser, Auth } from '../lib/auth';
export { LoggerToken } from '../lib/logger';
export { MailerToken, Mailer } from '../lib/mailer';
export { RedisClientToken } from '../lib/redis';
export { WebsocketsExceptionFilter } from '../lib/ws';

export const isNumber = new ParseNumberPipe();

export const isBoolean = new ParseBooleanPipe();

export enum Roles {
  Admin = 'admin',
  User = 'user'
}

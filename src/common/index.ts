import { ParseBooleanPipe } from './pipes/parse-boolean.pipe';
import { ParseNumberPipe } from './pipes/parse-number.pipe';

export { Files } from './decorators/files.decorator';
export { MailerToken, Mailer } from '../lib/mailer';
export { WebsocketsExceptionFilter } from '../lib/ws';

export const isNumber = new ParseNumberPipe();

export const isBoolean = new ParseBooleanPipe();

export enum Roles {
  Admin = 'admin',
  User = 'user'
}

import { Mailer, MailerConfiguration } from './mailer';
import { MailerToken } from './mailer.constants';

export function createMailerProviders(options: MailerConfiguration) {
  const mailerProvider = {
    provide: MailerToken,
    useFactory: () => new Mailer(options)
  };

  return [mailerProvider];
}

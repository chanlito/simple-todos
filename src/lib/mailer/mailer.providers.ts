import { Mandrill } from 'mandrill-api';
import * as nodemailer from 'nodemailer';

import { MailerToken } from './mailer.constants';

interface MailerOption {
  subject: string;
  to: string[];
  from: string;
  html: string;
}

export class Mailer {
  private transporter: nodemailer.Transporter;
  private mandrillClient: Mandrill;

  constructor(private readonly option: CreateMailerProviders) {
    this.mandrillClient = new Mandrill(option.mandrillOptions.apiKey);
    this.mandrillClient.users.ping(
      {},
      result => console.log('Mandrill OK!', result),
      e => console.log('Mandrill BOOM!', e)
    );

    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { type: 'OAuth2', ...option.gmailOptions }
    });
  }
  send(
    opts: MailerOption = {
      subject: 'Tesjor Mail',
      to: ['dominic.preap@pathmazing.com'],
      from: 'Tesjor <noreply@tesjor.com>',
      html: '<h1>Default HMTL Tesjor</h1>'
    }
  ) {
    try {
      if (this.option.type === 'gmail') return this.transporter.sendMail(opts);
      else {
        const message = {
          auto_text: true,
          from_email: 'noreply@tesjor.com',
          from_name: 'Tesjor',
          html: opts.html,
          important: true,
          subject: opts.subject,
          to: opts.to.map(email => ({ email, type: 'to' }))
        };
        return this.mandrillClient.messages.send({ message, async: true });
      }
    } catch (error) {
      console.error('Send Mail', error);
    }
  }
}

export function createMailerProviders(options: CreateMailerProviders) {
  const mailerProvider = {
    provide: MailerToken,
    useFactory: () => new Mailer(options)
  };

  return [mailerProvider];
}

export interface CreateMailerProviders {
  type: 'gmail' | 'mandrill';
  mandrillOptions?: {
    apiKey: string;
  };
  gmailOptions?: {
    user: string;
    clientId: string;
    clientSecret: string;
    refreshToken: string;
  };
}

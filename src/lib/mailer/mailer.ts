import { Logger } from '@nestjs/common';
import { Mandrill } from 'mandrill-api';
import * as nodemailer from 'nodemailer';

export class Mailer {
  private mandrillClient: Mandrill;
  private transporter: nodemailer.Transporter;
  private logger: Logger = new Logger('MailerModule');

  constructor(private readonly config: MailerConfiguration) {
    if (config.type === 'mandrill') {
      this.logger.log('using "mandrill"');
      this.mandrillClient = new Mandrill(config.mandrill.apiKey);
      this.mandrillClient.users.ping(
        {},
        result => this.logger.log('ping "mandrill" success'),
        e => this.logger.error('ping "mandrill" failed')
      );
    } else if (config.type === 'gmail') {
      this.logger.log('using "gmail"');
      this.transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { type: 'OAuth2', ...config.gmail }
      });
    } else {
      this.logger.log('using "ethereal"');
      this.transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
          user: config.ethreal.username,
          pass: config.ethreal.password
        }
      });
    }
  }

  async send(opts: SendOptions): Promise<void> {
    try {
      if (this.config.type === 'mandrill') {
        const message = {
          auto_text: true,
          from_email: opts.fromEmail,
          from_name: opts.fromName,
          html: opts.html,
          important: true,
          subject: opts.subject,
          to: opts.to.map(email => ({ email, type: 'to' }))
        };
        this.mandrillClient.messages.send(
          { message, async: true },
          result => {
            this.logger.log(`mail sent to ${opts.to}`);
          },
          (error: any) => {
            this.logger.error(error.message, error.stack);
          }
        );
      } else {
        await this.transporter.sendMail(opts);
        this.logger.log(`mail sent to ${opts.to}`);
      }
    } catch (error) {
      this.logger.error(error.message, error.stack);
    }
  }
}

export interface MailerConfiguration {
  type: 'ethreal' | 'gmail' | 'mandrill';
  ethreal?: {
    username: string;
    password: string;
  };
  gmail?: {
    user: string;
    clientId: string;
    clientSecret: string;
    refreshToken: string;
  };
  mandrill?: {
    apiKey: string;
  };
}

interface SendOptions {
  subject: string;
  to: string[];
  fromName: string;
  fromEmail: string;
  html: string;
}

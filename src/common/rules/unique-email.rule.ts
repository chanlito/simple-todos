import { getRepository } from 'typeorm';

import { User } from '../../entity';

export function uniqueEmail(data: any, field: string, message: string, args: any[], get: Function): Promise<string> {
  return new Promise((resolve, reject) => {
    const email: string = get(data, field);
    getRepository(User)
      .findOne({ where: { email } })
      .then(
        u => {
          return u ? reject(`Email address already exists.`) : resolve();
        },
        e => {
          reject(e.message);
        }
      );
  });
}

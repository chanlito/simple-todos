import { expect } from 'chai';
import * as request from 'supertest';
import { getConnection } from 'typeorm';

import { getServer } from '../../../test';
import { JamesBond } from '../../../test/mocks';
import { User } from '../../entity';

let server;

describe('Auth APIs', () => {
  let res: request.Response;

  before(async () => {
    server = await getServer();
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(User)
      .where('email = :email', { email: JamesBond.email })
      .printSql()
      .execute();
  });

  describe('POST /auth/register', () => {
    it('should respond with 201', async () => {
      res = await request(server)
        .post('/auth/register')
        .send({
          email: JamesBond.email,
          password: JamesBond.password,
          firstName: 'James',
          lastName: 'Bond'
        })
        .expect(201);
    });

    it('should respond with message "OK"', () => {
      expect(res.body.message).to.equal('OK');
    });
  });

  describe('POST /auth/login', () => {
    it('should respond with 201', async () => {
      res = await request(server)
        .post('/auth/login')
        .send({
          email: JamesBond.email,
          password: JamesBond.password
        })
        .expect(201);
    });

    it('should respond with a string token & not null', () => {
      expect(res.body.token).to.be.string;
      expect(res.body.token).to.not.be.null;
    });
  });
});

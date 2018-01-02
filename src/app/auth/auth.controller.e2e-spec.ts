import { expect } from 'chai';
import * as request from 'supertest';
import { getConnection } from 'typeorm';

import { getServer } from '../../../test';
import { jamesBond } from '../../../test/mocks';
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
      .where('email = :email', { email: jamesBond.email })
      .execute();
  });

  describe('POST /auth/register', () => {
    it('should respond with 201', async () => {
      res = await request(server)
        .post('/auth/register')
        .send({
          email: jamesBond.email,
          password: jamesBond.password,
          firstName: 'James',
          lastName: 'Bond'
        })
        .expect(201);
    });

    it('should respond with message "OK"', () => {
      expect(res.body.message).to.equal('OK');
    });
  });

  const loginURL = '/auth/login';

  describe(`POST ${loginURL}`, () => {
    it('should respond with 201', async () => {
      res = await request(server)
        .post(loginURL)
        .send({
          email: jamesBond.email,
          password: jamesBond.password
        })
        .expect(201);
    });

    it('should respond with a string token & not null', () => {
      expect(res.body.token).to.be.string;
      expect(res.body.token).to.not.be.null;
    });

    it('should respond with 400 when incorrect email', async () => {
      res = await request(server)
        .post(loginURL)
        .send({
          email: 'incorrect@email.com',
          password: jamesBond.password
        })
        .expect(400);
    });

    it('should respond with 400 when incorrect password', async () => {
      res = await request(server)
        .post(loginURL)
        .send({
          email: jamesBond.email,
          password: '12345678'
        })
        .expect(400);
    });
  });
});

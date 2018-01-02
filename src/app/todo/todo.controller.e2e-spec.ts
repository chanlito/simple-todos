import { expect } from 'chai';
import * as request from 'supertest';
import { getRepository } from 'typeorm';

import { getServer } from '../../../test';
import { JamesBond } from '../../../test/mocks';
import { Todo } from '../../entity';

let server;
let token;

describe('Auth APIs', () => {
  let res: request.Response;

  before(async () => {
    server = await getServer();
    res = await request(server)
      .post('/auth/login')
      .send({
        email: JamesBond.email,
        password: JamesBond.password
      });
    token = `Bearer ` + res.body.token;
  });

  after(async () => {
    await getRepository(Todo).deleteById(res.body.id);
  });

  describe('POST /todos', () => {
    it('should respond with 201', async () => {
      res = await request(server)
        .post('/todos')
        .set('Authorization', token)
        .send({
          title: 'Do homework!',
          description: '...'
        })
        .expect(201);
    });

    it('should respond with a title and description', () => {
      expect(res.body.title).to.equals('Do homework!');
      expect(res.body.description).to.equals('...');
    });
  });

  describe('GET /todos', () => {
    it('should respond with 200', async () => {
      res = await request(server)
        .get('/todos')
        .set('Authorization', token)
        .expect(200);
    });

    it('should respond with an array', () => {
      expect(res.body.data).to.be.an('array');
    });
  });
});

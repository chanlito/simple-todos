import { expect } from 'chai';
import * as request from 'supertest';
import { getRepository } from 'typeorm';

import { Todo } from '../../../src/entity';
import { getServer } from '../../../test';
import { jamesBond } from '../../../test/mocks';

let server;
let token;
let todoId;

describe('Todo APIs', () => {
  let res: request.Response;

  before(async () => {
    server = await getServer();
    res = await request(server)
      .post('/auth/login')
      .send({
        email: jamesBond.email,
        password: jamesBond.password
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

      todoId = res.body.id;
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

  describe('PUT /todos/:id', () => {
    it('should respond with 200', async () => {
      res = await request(server)
        .put(`/todos/${todoId}`)
        .set('Authorization', token)
        .send({
          title: 'Do homework update',
          description: 'update',
          isDone: true
        })
        .expect(200);
    });

    it('should respond correct title, description and isDone true', () => {
      expect(res.body.title).to.equals('Do homework update');
      expect(res.body.description).to.equals('update');
      expect(res.body.isDone).to.equals(true);
    });
  });

  describe('DELETE /todos/:id', () => {
    it('should respond with 200', async () => {
      res = await request(server)
        .delete(`/todos/${todoId}`)
        .set('Authorization', token)
        .expect(200);
    });

    it('should respond undefined', async () => {
      const todo = await getRepository(Todo).findOneById(todoId);
      expect(todo).to.be.undefined;
    });
  });
});

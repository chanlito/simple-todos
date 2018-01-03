// import { expect } from 'chai';
// import * as sinon from 'sinon';

// import { TodoController } from '../../../src/app/todo/todo.controller';
// import { Todo } from '../../../src/entity';
// import { jamesBond } from '../../../test/mocks';

// let todoController: TodoController;
// let emMock: sinon.SinonStub;
// let redisClientMock: sinon.SinonStub;
// let todoRepositoryMock: sinon.SinonStub;

// const lg: any = {};
// const em: any = { save: () => undefined };
// const rd: any = { setex: () => undefined };
// const todoRepository: any = {};

// describe('Todos Controller', () => {
//   before(async () => {
//     todoController = new TodoController(lg, rd, em, todoRepository);
//   });

//   beforeEach(() => {
//     emMock = sinon.stub(em, 'save').callsFake(() => {
//       const t = new Todo();
//       t.title = 'new task';
//       t.description = 'test';
//       return t;
//     });
//     redisClientMock = sinon.stub(rd, 'setex').callsFake(() => undefined);
//   });

//   afterEach(() => {
//     emMock.restore();
//     redisClientMock.restore();
//   });

//   describe('#createTodo', () => {
//     it('should return correct title and description', async () => {
//       const r = await todoController.create({ title: 'new task', description: 'test' }, jamesBond);
//       expect(r.title).to.equals('new task');
//       expect(r.description).to.equals('test');
//     });
//   });
// });

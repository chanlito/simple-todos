import * as bcryptjs from 'bcryptjs';
import { expect } from 'chai';
import * as sinon from 'sinon';

import { AuthController } from '../../../src/app/auth/auth.controller';
import { User } from '../../../src/entity';
import { jamesBond } from '../../../test/mocks';

let authController: AuthController;
let compareMock;
let emMock: sinon.SinonStub;
let userRepositoryMock: sinon.SinonStub;

const em: any = {
  transaction: () => undefined
};
const userRepository: any = {
  findByEmail: () => undefined
};

describe('Auth Controller', () => {
  before(async () => {
    authController = new AuthController(em, userRepository);
  });

  beforeEach(() => {
    compareMock = sinon.stub(bcryptjs, 'compare').returns(true);
    emMock = sinon.stub(em, 'transaction').callsFake(() => undefined);
    userRepositoryMock = sinon.stub(userRepository, 'findByEmail').callsFake(() => {
      const u = new User();
      u.id = 1;
      u.email = jamesBond.email;
      u.password = jamesBond.password;
      return u;
    });
  });

  afterEach(() => {
    compareMock.restore();
    emMock.restore();
    userRepositoryMock.restore();
  });

  describe('#register', () => {
    it('should return message OK', async () => {
      const r = await authController.register({
        email: 'james.bond@mailinator.com',
        firstName: 'James',
        lastName: 'Bond',
        password: '123456'
      });
      expect(r.message).to.equals('OK');
    });
  });

  describe('#login', () => {
    it('should return an object with a token', async () => {
      const r = await authController.login({
        email: jamesBond.email,
        password: jamesBond.password
      });
      expect(r.token).to.be.string;
      expect(r.token).to.not.be.null;
    });
  });
});

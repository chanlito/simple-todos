import * as bcryptjs from 'bcryptjs';
import { expect } from 'chai';
import * as sinon from 'sinon';

import { JamesBond } from '../../../test/mocks';
import { User } from '../../entity';
import { AuthController } from './auth.controller';

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
      u.email = JamesBond.email;
      u.password = JamesBond.password;
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
        email: JamesBond.email,
        password: JamesBond.password
      });
      expect(r.token).to.be.string;
      expect(r.token).to.not.be.null;
    });
  });
});

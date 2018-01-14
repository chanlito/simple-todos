import { GatewayMiddleware } from '@nestjs/websockets';
import { verify } from 'jsonwebtoken';
import { InjectCustomRepository } from 'nestjs-extensions';
import { promisify } from 'util';

import { User } from '../../entity';
import { UserRepository } from '../../repository';

export class AuthGatewayMiddleware implements GatewayMiddleware {
  constructor(@InjectCustomRepository(User) private readonly userRepository: UserRepository) {}

  resolve() {
    return async (socket: SocketIO.Socket, next: Function): Promise<void> => {
      try {
        const decodedJWT: { id: number; email: string } = await this.verifyJWT(socket.handshake.query.accessToken);
        const user = await this.userRepository.findByEmail(decodedJWT.email);
        if (!user) return next(new Error('User was not found.'));
        next();
      } catch (error) {
        next(error);
      }
    };
  }

  private async verifyJWT(accessToken: string): Promise<any> {
    return promisify(verify)(accessToken, process.env.SECRET);
  }
}

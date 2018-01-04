import { Logger, UseFilters } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway } from '@nestjs/websockets';

import { WebsocketsExceptionFilter } from '../../common';
import { AuthGatewayMiddleware } from './auth.gateway-middleware';

@WebSocketGateway({ namespace: 'auth', middlewares: [AuthGatewayMiddleware] })
@UseFilters(new WebsocketsExceptionFilter())
export class AuthGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private logger = new Logger('AuthGateway');
  // @WebSocketServer() private readonly io: SocketIO.Server;

  handleConnection(socket: SocketIO.Socket) {
    this.logger.log(`${socket.id} connected!`);
    // throw new Error('WTF');
    // console.log(this.io);
  }

  handleDisconnect(socket: SocketIO.Socket) {
    this.logger.log(`${socket.id} disconnected!`);
  }
}

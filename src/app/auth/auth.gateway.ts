import { Logger, UseFilters } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WsException } from '@nestjs/websockets';

import { WebsocketsExceptionFilter } from '../../common';
import { AuthGatewayMiddleware } from './auth.gateway-middleware';

@WebSocketGateway({ namespace: 'auth', middlewares: [AuthGatewayMiddleware] })
export class AuthGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private logger = new Logger('AuthGateway');
  // @WebSocketServer() private readonly io: SocketIO.Server;

  @UseFilters(new WebsocketsExceptionFilter())
  async handleConnection(socket: SocketIO.Socket) {
    this.logger.log(`${socket.id} connected!`);
    throw new WsException('WTF'); // <----- Like this one!
    // console.log(this.io);
  }

  handleDisconnect(socket: SocketIO.Socket) {
    this.logger.log(`${socket.id} disconnected!`);
  }
}

import { Logger, UseFilters } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { WebsocketsExceptionFilter } from 'nestjs-extensions';

import { AuthGatewayMiddleware } from './auth.gateway-middleware';

@UseFilters(new WebsocketsExceptionFilter())
@WebSocketGateway({ namespace: 'auth', middlewares: [AuthGatewayMiddleware] })
export class AuthGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private logger = new Logger('AuthGateway');
  @WebSocketServer() private readonly io: SocketIO.Server;

  async handleConnection(socket: SocketIO.Socket) {
    this.logger.log(`Socket ID: ${socket.id} connected!`);
  }

  async handleDisconnect(socket: SocketIO.Socket) {
    this.logger.log(`Socket ID: ${socket.id} disconnected!`);
  }

  @SubscribeMessage('WELCOME')
  async onWelcome(socket: SocketIO.Socket, data: any) {
    this.io.emit('WELCOME', `Welcome ${socket.id}.`);
  }
}

import { Logger, UseFilters } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import * as redis from 'redis';
import * as socketIoRedis from 'socket.io-redis';

import { WebsocketsExceptionFilter } from './ws-exception.filter';

const { REDIS_HOST, REDIS_PORT, REDIS_AUTH_PASS } = process.env as any;

@WebSocketGateway()
@UseFilters(new WebsocketsExceptionFilter())
export class WsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private logger = new Logger('WsGateway');
  @WebSocketServer() private readonly io: SocketIO.Server;

  afterInit(io: SocketIO.Server) {
    const options: redis.ClientOpts = { host: REDIS_HOST, port: REDIS_PORT, auth_pass: REDIS_AUTH_PASS };
    const pubClient = redis.createClient(options);
    const subClient = redis.createClient(options);
    io.adapter(socketIoRedis({ pubClient, subClient }));
  }

  handleConnection(socket: SocketIO.Socket) {
    this.logger.log(`${socket.id} connected!`);
  }

  handleDisconnect(socket: SocketIO.Socket) {
    this.logger.log(`${socket.id} disconnected!`);
  }

  @SubscribeMessage('WELCOME')
  onWelcome(socket: SocketIO.Socket, data: any) {
    this.io.emit('WELCOME', `Welcome ${socket.id}.`);
  }
}

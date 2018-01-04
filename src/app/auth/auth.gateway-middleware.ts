import { GatewayMiddleware } from '@nestjs/websockets';

export class AuthGatewayMiddleware implements GatewayMiddleware {
  resolve() {
    return (socket: SocketIO.Socket, next: Function): void => {
      next();
    };
  }
}

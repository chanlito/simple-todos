import { GatewayMiddleware } from '@nestjs/websockets';

export class AuthGatewayMiddleware implements GatewayMiddleware {
  resolve() {
    return async (socket: SocketIO.Socket, next: Function): Promise<void> => {
      next();
    };
  }
}

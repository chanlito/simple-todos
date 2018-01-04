import { Catch, WsExceptionFilter } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';

@Catch(Error, WsException)
export class WebsocketsExceptionFilter implements WsExceptionFilter {
  catch(exception: WsException, socket: SocketIO.Socket) {
    socket.emit('exception', {
      status: 'error',
      message: `It's a message from the exception filter`
    });
  }
}

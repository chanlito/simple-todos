import { Catch, WsExceptionFilter } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';

@Catch(WsException)
export class WebsocketsExceptionFilter implements WsExceptionFilter {
  catch(exception: WsException, socket: SocketIO.Socket) {
    console.log('exception', exception);
    socket.emit('exception', {
      status: 'error',
      message: `It's a message from the exception filter`
    });
  }
}

import { Catch, WsExceptionFilter } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';

@Catch(WsException)
export class WebsocketsExceptionFilter implements WsExceptionFilter {
  catch(exception: WsException, socket: SocketIO.Socket) {
    socket.emit('exception', {
      status: 'exception',
      message: exception.getError()
    });
  }
}

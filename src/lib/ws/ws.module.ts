import { Module } from '@nestjs/common';

import { WsGateway } from './ws.gateway';

@Module({
  components: [WsGateway]
})
export class WsModule {}

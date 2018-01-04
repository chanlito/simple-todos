import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthGateway } from './auth.gateway';

@Module({
  controllers: [AuthController],
  components: [AuthGateway]
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.md';
import { AuthController } from './auth.ctrl';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.sv';
import { LocalStrategy } from './local.strategy';
import { UserService } from '../user/user.sv';

@Module({
  imports: [UserModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}

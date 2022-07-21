import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.md';
import { AuthController } from './auth.ctrl';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.sv';
// import { LocalStrategy } from './local.strategy';

@Module({
  imports: [UserModule, JwtModule.register({})],
  controllers: [AuthController],
  // providers: [AuthService, LocalStrategy],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}

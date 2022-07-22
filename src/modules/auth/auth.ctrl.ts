import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.sv';
import { LoginInput } from './auth.dto';
import { JwtAuthGuard } from './jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(protected readonly authService: AuthService) {}

  @Get('test')
  @UseGuards(JwtAuthGuard)
  async test(@Req() req) {
    return 'test';
  }

  @Post('login')
  async login(@Body() loginInput: LoginInput) {
    return await this.authService.login(loginInput);
  }

  // // login을 하지 않고 프론트엔드에서 apiKey 값으로 토큰값을 얻음
  // @Get('get-token')
  // async getToken(
  //   @Headers('accessKey') accessKey: string,
  //   @Headers('secretKey') secretKey: string,
  // ) {
  //   return await this.authService.getAccessToekn(accessKey, secretKey);
  // }
}

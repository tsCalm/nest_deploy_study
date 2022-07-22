import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { User } from '../user/user.et';
import { LoginInput } from './auth.dto';
import { UserService } from '../user/user.sv';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  generateJwtTokens = async (id: number, email: string): Promise<string> => {
    try {
      const accessTokenSecret = this.configService.get(
        'JWT_ACCESS_TOKEN_SECRET',
      );
      const token = await this.jwtService.signAsync(
        { sub: id, email },
        { secret: accessTokenSecret },
      );
      return token;
    } catch (err) {
      console.log('auth.service generateJwtTokens error : ', err.message);
      throw new Error(err.message);
      // throw new IError(HttpStatus.BAD_REQUEST, err.message);
    }
  };

  validatePassword = async (loginUserInput: LoginInput): Promise<User> => {
    try {
      const loginUser = loginUserInput as LoginInput;
      const email = loginUser.email;
      const password = loginUser.password;

      const user = await this.userService.findOneByEmail(email);

      if (!user) throw new Error('User is not found.');

      const adminPassword = await bcrypt.compare(password, user.password);
      if (adminPassword === false) throw new Error('Password is wrong.');

      return user;
    } catch (err) {
      console.log('auth.service validatePassword error : ', err.message);
      throw new Error(err.message);
    }
  };

  login = async (loginUserInput: LoginInput) => {
    try {
      // 1. 비밀번호 validate
      const user = await this.validatePassword(loginUserInput);
      // 2. 토큰 생성
      const token = await this.generateJwtTokens(user.id, user.email);
      // 3. token return
      return token;
    } catch (err) {
      console.log(err.message);
      return null;
    }
  };
}

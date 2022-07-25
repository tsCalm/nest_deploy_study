import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { In, Repository } from 'typeorm';
import { User } from '../user/user.et';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOneByEmail(email: string) {
    try {
      const findedUser = await this.userRepository.findOne({
        select: ['id', 'email', 'password'],
        where: {
          email,
        },
      });
      return findedUser;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async findByIds(userIds: number[]) {
    return await this.userRepository.find({
      where: {
        id: In(userIds),
      },
    });
  }
}

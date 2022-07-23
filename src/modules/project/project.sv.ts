import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { Repository } from 'typeorm';
import { Project } from './project.et';
import { IError } from '../common/response-class';
import { IResObj } from '../common/response-class';
import { IResObjList } from '../common/response-class';
import { IResType } from '../common/response-type';
import { BaseService } from '../common/base-service';

@Injectable()
export class ProjectService extends BaseService<Project> {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {
    super();
  }

  // main page side-bar project list
  async findAll(): Promise<IResType> {
    try {
      const result = await this.projectRepository.find();
      return this.resList(result);
    } catch (err) {
      console.log('project.service findAll error : ', err.message);
      return this.resError(err.message);
    }
  }

  async create(title: string): Promise<IResType> {
    try {
      const result = await this.projectRepository.save({
        title,
      });
      return this.resObj(result);
    } catch (err) {
      console.log('project.service create error : ', err.message);
      return this.resError(err.message);
    }
  }
}

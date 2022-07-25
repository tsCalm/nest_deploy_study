import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { BaseService } from '../common/base-service';
import { IResType } from '../common/response-type';
import { Card } from './card.et';
import { CardInput } from './card.dto';

@Injectable()
export class CardService extends BaseService<Card> {
  constructor(
    @InjectRepository(Card)
    private readonly CardRepository: Repository<Card>,
  ) {
    super();
  }

  // project - card list
  async findAll(projectId: number): Promise<IResType> {
    try {
      const result = await this.CardRepository.find({
        where: {
          projectId,
        },
      });
      return this.resList(result);
    } catch (err) {
      console.log('card.service findAll error : ', err.message);
      return this.resError(err.message);
    }
  }

  async create(projectId: number, cardInput: CardInput): Promise<IResType> {
    try {
      const result = await this.CardRepository.save({
        ...cardInput,
        projectId,
      });
      return this.resObj(result);
    } catch (err) {
      console.log('card.service create error : ', err.message);
      return this.resError(err.message);
    }
  }
  async search(projectId: number, keyword: string) {
    try {
      const result = await this.CardRepository.find({
        where: [
          {
            title: Like(`%${keyword}%`),
            projectId,
          },
          {
            content: Like(`%${keyword}%`),
            projectId,
          },
        ],
      });
      console.log('result : ', result);
      return this.resList(result);
    } catch (err) {
      console.log('card.service search error :', err.message);
      return this.resError(err.message);
    }
  }
  async delete(projectId: number, id: number) {
    try {
      await this.CardRepository.delete(id);
      const result = await this.CardRepository.find({
        where: {
          projectId,
        },
      });
      return this.resList(result);
    } catch (err) {
      console.log('card.service search error :', err.message);
      return this.resError(err.message);
    }
  }
}

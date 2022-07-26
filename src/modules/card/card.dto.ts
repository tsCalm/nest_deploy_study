import {
  IsDefined,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';
import { CardTypeEnum } from './card.type';

export class CardInput {
  @IsOptional()
  @IsEnum(CardTypeEnum)
  card_type: CardTypeEnum;

  @IsDefined()
  @IsString()
  title: string;

  @IsDefined()
  @IsString()
  content: string;

  @IsDefined()
  @IsString()
  end_date: string;
}

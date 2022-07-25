import {
  IsArray,
  IsDefined,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class ProjectInput {
  @IsDefined()
  @IsString()
  start_date: string;

  @IsDefined()
  @IsString()
  end_date: string;

  @IsDefined()
  @IsString()
  title: string;

  @IsDefined()
  @IsString()
  content: string;

  @IsInt({ each: true })
  userIds: number[];
}

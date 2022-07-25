import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './card.et';
import { CardService } from './card.sv';
import { CardController } from './card.ctrl';
import { Tag } from '../tag/tag.et';

@Module({
  imports: [TypeOrmModule.forFeature([Card, Tag])],
  controllers: [CardController],
  providers: [CardService],
  exports: [CardService],
})
export class CardModule {}

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CardService } from './card.sv';
import { CardInput } from './card.dto';

@Controller(':projectId/card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Get('')
  async findAll(@Param('projectId') projectId: number) {
    console.log('projectId : ', projectId);
    return await this.cardService.findAll(projectId);
  }

  @Post('')
  async create(
    @Param('projectId') projectId: number,
    @Body() cardInput: CardInput,
  ) {
    return await this.cardService.create(projectId, cardInput);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
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

  @Get('search')
  async search(
    @Param('projectId') projectId: number,
    @Query('keyword') keyword: string,
  ) {
    return await this.cardService.search(projectId, keyword);
  }

  @Delete(':id')
  async delete(@Param('projectId') projectId: number, @Param('id') id: number) {
    return await this.cardService.delete(projectId, id);
  }
}

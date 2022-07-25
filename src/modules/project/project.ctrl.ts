import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProjectService } from './project.sv';
import { ProjectInput } from './project.dto';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  async findAll() {
    return await this.projectService.findAll();
  }

  @Post('')
  async create(@Body() projectInput: ProjectInput) {
    return await this.projectService.create(projectInput);
  }
}

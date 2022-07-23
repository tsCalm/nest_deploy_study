import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProjectService } from './project.sv';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  async findAll() {
    return await this.projectService.findAll();
  }

  @Post('')
  async create(@Body('title') title: string) {
    return await this.projectService.create(title);
  }
}

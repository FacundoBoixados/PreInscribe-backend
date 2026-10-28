import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EvaluacionesService } from './evaluaciones.service.js';
import { CreateEvaluacioneDto } from './dto/create-evaluacione.dto.js';
import { UpdateEvaluacioneDto } from './dto/update-evaluacione.dto.js';

@Controller('evaluaciones')
export class EvaluacionesController {
  constructor(private readonly evaluacionesService: EvaluacionesService) {}

  @Post()
  create(@Body() createEvaluacioneDto: CreateEvaluacioneDto) {
    return this.evaluacionesService.create(createEvaluacioneDto);
  }

  @Get()
  findAll() {
    return this.evaluacionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.evaluacionesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEvaluacioneDto: UpdateEvaluacioneDto) {
    return this.evaluacionesService.update(+id, updateEvaluacioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.evaluacionesService.remove(+id);
  }
}

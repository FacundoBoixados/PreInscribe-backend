import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NivelesGradosService } from './niveles-grados.service.js';
import { CreateCicloLectivoDto } from './dto/create-ciclo-lectivo.dto.js';
import { UpdateCicloLectivoDto } from './dto/update-ciclo-lectivo.dto.js';

@Controller('niveles-grados')
export class NivelesGradosController {
  constructor(private readonly nivelesGradosService: NivelesGradosService) {}

  @Post()
  create(@Body() createCicloLectivoDto: CreateCicloLectivoDto) {
    return this.nivelesGradosService.create(createCicloLectivoDto);
  }

  @Get()
  findAll() {
    return this.nivelesGradosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nivelesGradosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCicloLectivoDto: UpdateCicloLectivoDto) {
    return this.nivelesGradosService.update(+id, updateCicloLectivoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nivelesGradosService.remove(+id);
  }
}

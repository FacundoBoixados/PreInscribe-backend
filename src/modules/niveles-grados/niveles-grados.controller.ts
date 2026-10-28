import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NivelesGradosService } from './niveles-grados.service.js';
import { CreateNivelesGradoDto } from './dto/create-niveles-grado.dto.js';
import { UpdateNivelesGradoDto } from './dto/update-niveles-grado.dto.js';

@Controller('niveles-grados')
export class NivelesGradosController {
  constructor(private readonly nivelesGradosService: NivelesGradosService) {}

  @Post()
  create(@Body() createNivelesGradoDto: CreateNivelesGradoDto) {
    return this.nivelesGradosService.create(createNivelesGradoDto);
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
  update(@Param('id') id: string, @Body() updateNivelesGradoDto: UpdateNivelesGradoDto) {
    return this.nivelesGradosService.update(+id, updateNivelesGradoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nivelesGradosService.remove(+id);
  }
}

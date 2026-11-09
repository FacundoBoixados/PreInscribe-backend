import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PreinscripcionesService } from './preinscripciones.service.js';
import { CreatePreinscripcionDto } from './dto/create-preinscripcione.dto.js';
import { UpdatePreinscripcionDto } from './dto/update-preinscripcione.dto.js';

@Controller('preinscripciones')
export class PreinscripcionesController {
  constructor(private readonly preinscripcionesService: PreinscripcionesService) {}

  @Post()
  create(@Body() createPreinscripcionDto: CreatePreinscripcionDto) {
    return this.preinscripcionesService.create(createPreinscripcionDto);
  }

  @Get()
  findAll() {
    return this.preinscripcionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.preinscripcionesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePreinscripcionDto: UpdatePreinscripcionDto) {
    return this.preinscripcionesService.update(+id, updatePreinscripcionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.preinscripcionesService.remove(+id);
  }
}

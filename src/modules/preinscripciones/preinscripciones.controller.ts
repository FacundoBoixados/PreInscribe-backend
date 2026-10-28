import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PreinscripcionesService } from './preinscripciones.service.js';
import { CreatePreinscripcioneDto } from './dto/create-preinscripcione.dto.js';
import { UpdatePreinscripcioneDto } from './dto/update-preinscripcione.dto.js';

@Controller('preinscripciones')
export class PreinscripcionesController {
  constructor(private readonly preinscripcionesService: PreinscripcionesService) {}

  @Post()
  create(@Body() createPreinscripcioneDto: CreatePreinscripcioneDto) {
    return this.preinscripcionesService.create(createPreinscripcioneDto);
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
  update(@Param('id') id: string, @Body() updatePreinscripcioneDto: UpdatePreinscripcioneDto) {
    return this.preinscripcionesService.update(+id, updatePreinscripcioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.preinscripcionesService.remove(+id);
  }
}

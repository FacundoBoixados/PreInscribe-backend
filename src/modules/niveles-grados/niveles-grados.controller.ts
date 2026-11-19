import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { NivelesGradosService } from './niveles-grados.service.js';
import { CreateGradoDto } from './dto/create-grado.dto.js';
import { UpdateGradoDto } from './dto/update-grado.dto.js';
import { CreateCicloLectivoDto } from './dto/create-ciclo-lectivo.dto.js';
import { UpdateCicloLectivoDto } from './dto/update-ciclo-lectivo.dto.js';
import { CreatePeriodoPreinscripcionDto } from './dto/create-periodo-preinscripcion.dto.js';
import { UpdatePeriodoPreinscripcionDto } from './dto/update-periodo-preinscripcion.dto.js';

@Controller('niveles-grados')
export class NivelesGradosController {
  constructor(private readonly nivelesGradosService: NivelesGradosService) {}

  // ---------- Niveles ----------

  @Get('niveles')
  findAllNiveles() {
    return this.nivelesGradosService.findAllNiveles();
  }

  // ---------- Grados ----------

  @Post('grados')
  createGrado(@Body() dto: CreateGradoDto) {
    return this.nivelesGradosService.createGrado(dto);
  }

  @Get('grados')
  findAllGrados() {
    return this.nivelesGradosService.findAllGrados();
  }

  @Get('grados/:id')
  findOneGrado(@Param('id') id: string) {
    return this.nivelesGradosService.findOneGrado(+id);
  }

  @Patch('grados/:id')
  updateGrado(@Param('id') id: string, @Body() dto: UpdateGradoDto) {
    return this.nivelesGradosService.updateGrado(+id, dto);
  }

  @Delete('grados/:id')
  removeGrado(@Param('id') id: string) {
    return this.nivelesGradosService.removeGrado(+id);
  }

  // ---------- Ciclos lectivos ----------

  @Post('ciclos-lectivos')
  createCicloLectivo(@Body() dto: CreateCicloLectivoDto) {
    return this.nivelesGradosService.createCicloLectivo(dto);
  }

  @Get('ciclos-lectivos')
  findAllCiclosLectivos() {
    return this.nivelesGradosService.findAllCiclosLectivos();
  }

  @Get('ciclos-lectivos/:id')
  findOneCicloLectivo(@Param('id') id: string) {
    return this.nivelesGradosService.findOneCicloLectivo(+id);
  }

  @Patch('ciclos-lectivos/:id')
  updateCicloLectivo(
    @Param('id') id: string,
    @Body() dto: UpdateCicloLectivoDto,
  ) {
    return this.nivelesGradosService.updateCicloLectivo(+id, dto);
  }

  @Delete('ciclos-lectivos/:id')
  removeCicloLectivo(@Param('id') id: string) {
    return this.nivelesGradosService.removeCicloLectivo(+id);
  }

  // ---------- Períodos de preinscripción ----------

  @Post('periodos-preinscripcion')
  createPeriodo(@Body() dto: CreatePeriodoPreinscripcionDto) {
    return this.nivelesGradosService.createPeriodo(dto);
  }

  @Get('periodos-preinscripcion')
  findAllPeriodos() {
    return this.nivelesGradosService.findAllPeriodos();
  }

  @Get('periodos-preinscripcion/:id')
  findOnePeriodo(@Param('id') id: string) {
    return this.nivelesGradosService.findOnePeriodo(+id);
  }

  @Patch('periodos-preinscripcion/:id')
  updatePeriodo(
    @Param('id') id: string,
    @Body() dto: UpdatePeriodoPreinscripcionDto,
  ) {
    return this.nivelesGradosService.updatePeriodo(+id, dto);
  }

  @Delete('periodos-preinscripcion/:id')
  removePeriodo(@Param('id') id: string) {
    return this.nivelesGradosService.removePeriodo(+id);
  }
}
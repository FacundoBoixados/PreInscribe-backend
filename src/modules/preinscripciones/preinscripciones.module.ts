import { Module } from '@nestjs/common';
import { PreinscripcionesService } from './preinscripciones.service.js';
import { PreinscripcionesController } from './preinscripciones.controller.js';

@Module({
  controllers: [PreinscripcionesController],
  providers: [PreinscripcionesService],
})
export class PreinscripcionesModule {}

import { Module } from '@nestjs/common';
import { EvaluacionesService } from './evaluaciones.service.js';
import { EvaluacionesController } from './evaluaciones.controller.js';

@Module({
  controllers: [EvaluacionesController],
  providers: [EvaluacionesService],
})
export class EvaluacionesModule {}

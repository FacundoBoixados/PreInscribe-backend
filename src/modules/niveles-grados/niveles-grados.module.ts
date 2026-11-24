import { Module } from '@nestjs/common';
import { NivelesGradosService } from './niveles-grados.service.js';
import { NivelesGradosController } from './niveles-grados.controller.js';

@Module({
  controllers: [NivelesGradosController],
  providers: [NivelesGradosService],
})
export class NivelesGradosModule {}

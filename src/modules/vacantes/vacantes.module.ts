import { Module } from '@nestjs/common';
import { VacantesService } from './vacantes.service.js';
import { VacantesController } from './vacantes.controller.js';

@Module({
  controllers: [VacantesController],
  providers: [VacantesService],
})
export class VacantesModule {}

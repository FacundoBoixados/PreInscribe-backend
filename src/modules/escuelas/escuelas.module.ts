import { Module } from '@nestjs/common';
import { EscuelasService } from './escuelas.service.js';
import { EscuelasController } from './escuelas.controller.js';

@Module({
  controllers: [EscuelasController],
  providers: [EscuelasService],
})
export class EscuelasModule {}

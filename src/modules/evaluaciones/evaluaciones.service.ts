import { Injectable } from '@nestjs/common';
import { CreateEvaluacioneDto } from './dto/create-evaluacione.dto.js';
import { UpdateEvaluacioneDto } from './dto/update-evaluacione.dto.js';

@Injectable()
export class EvaluacionesService {
  create(createEvaluacioneDto: CreateEvaluacioneDto) {
    return 'This action adds a new evaluacione';
  }

  findAll() {
    return `This action returns all evaluaciones`;
  }

  findOne(id: number) {
    return `This action returns a #${id} evaluacione`;
  }

  update(id: number, updateEvaluacioneDto: UpdateEvaluacioneDto) {
    return `This action updates a #${id} evaluacione`;
  }

  remove(id: number) {
    return `This action removes a #${id} evaluacione`;
  }
}

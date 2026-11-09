import { Injectable } from '@nestjs/common';
import { CreateCicloLectivoDto } from './dto/create-ciclo-lectivo.dto.js';
import { UpdateCicloLectivoDto } from './dto/update-ciclo-lectivo.dto.js';

@Injectable()
export class NivelesGradosService {
  create(createCicloLectivoDto: CreateCicloLectivoDto) {
    return 'This action adds a new nivelesGrado';
  }

  findAll() {
    return `This action returns all nivelesGrados`;
  }

  findOne(id: number) {
    return `This action returns a #${id} nivelesGrado`;
  }

  update(id: number, updateCicloLectivoDto: UpdateCicloLectivoDto) {
    return `This action updates a #${id} nivelesGrado`;
  }

  remove(id: number) {
    return `This action removes a #${id} nivelesGrado`;
  }
}

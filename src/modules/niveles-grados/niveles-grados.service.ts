import { Injectable } from '@nestjs/common';
import { CreateNivelesGradoDto } from './dto/create-niveles-grado.dto.js';
import { UpdateNivelesGradoDto } from './dto/update-niveles-grado.dto.js';

@Injectable()
export class NivelesGradosService {
  create(createNivelesGradoDto: CreateNivelesGradoDto) {
    return 'This action adds a new nivelesGrado';
  }

  findAll() {
    return `This action returns all nivelesGrados`;
  }

  findOne(id: number) {
    return `This action returns a #${id} nivelesGrado`;
  }

  update(id: number, updateNivelesGradoDto: UpdateNivelesGradoDto) {
    return `This action updates a #${id} nivelesGrado`;
  }

  remove(id: number) {
    return `This action removes a #${id} nivelesGrado`;
  }
}

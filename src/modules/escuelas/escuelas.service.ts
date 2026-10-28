import { Injectable } from '@nestjs/common';
import { CreateEscuelaDto } from './dto/create-escuela.dto.js';
import { UpdateEscuelaDto } from './dto/update-escuela.dto.js';

@Injectable()
export class EscuelasService {
  create(createEscuelaDto: CreateEscuelaDto) {
    return 'This action adds a new escuela';
  }

  findAll() {
    return `This action returns all escuelas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} escuela`;
  }

  update(id: number, updateEscuelaDto: UpdateEscuelaDto) {
    return `This action updates a #${id} escuela`;
  }

  remove(id: number) {
    return `This action removes a #${id} escuela`;
  }
}

import { Injectable } from '@nestjs/common';
import { CreatePreinscripcionDto } from './dto/create-preinscripcione.dto.js';
import { UpdatePreinscripcionDto } from './dto/update-preinscripcione.dto.js';

@Injectable()
export class PreinscripcionesService {
  create(createPreinscripcionDto: CreatePreinscripcionDto) {
    return 'This action adds a new preinscripcion';
  }

  findAll() {
    return `This action returns all preinscripciones`;
  }

  findOne(id: number) {
    return `This action returns a #${id} preinscripcion`;
  }

  update(id: number, updatePreinscripcionDto: UpdatePreinscripcionDto) {
    return `This action updates a #${id} preinscripcion`;
  }

  remove(id: number) {
    return `This action removes a #${id} preinscripcion`;
  }
}

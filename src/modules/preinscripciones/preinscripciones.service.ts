import { Injectable } from '@nestjs/common';
import { CreatePreinscripcioneDto } from './dto/create-preinscripcione.dto.js';
import { UpdatePreinscripcioneDto } from './dto/update-preinscripcione.dto.js';

@Injectable()
export class PreinscripcionesService {
  create(createPreinscripcioneDto: CreatePreinscripcioneDto) {
    return 'This action adds a new preinscripcione';
  }

  findAll() {
    return `This action returns all preinscripciones`;
  }

  findOne(id: number) {
    return `This action returns a #${id} preinscripcione`;
  }

  update(id: number, updatePreinscripcioneDto: UpdatePreinscripcioneDto) {
    return `This action updates a #${id} preinscripcione`;
  }

  remove(id: number) {
    return `This action removes a #${id} preinscripcione`;
  }
}

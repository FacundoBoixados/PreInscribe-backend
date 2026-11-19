import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateEscuelaDto } from './dto/create-escuela.dto.js';
import { UpdateEscuelaDto } from './dto/update-escuela.dto.js';

@Injectable()
export class EscuelasService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createEscuelaDto: CreateEscuelaDto) {
    await this.validateLocalidad(createEscuelaDto.localidadId);

    if (createEscuelaDto.cue) {
      await this.validateCue(createEscuelaDto.cue);
    }

    return this.prisma.escuela.create({ data: createEscuelaDto });
  }

  findAll() {
    return this.prisma.escuela.findMany();
  }

  async findOne(id: number) {
    const escuela = await this.prisma.escuela.findUnique({ where: { id } });

    if (!escuela) {
      throw new NotFoundException(`No existe una escuela con id ${id}.`);
    }

    return escuela;
  }

  async update(id: number, updateEscuelaDto: UpdateEscuelaDto) {
    await this.findOne(id);

    if (updateEscuelaDto.localidadId) {
      await this.validateLocalidad(updateEscuelaDto.localidadId);
    }
    if (updateEscuelaDto.cue) {
      await this.validateCue(updateEscuelaDto.cue, id);
    }

    return this.prisma.escuela.update({
      where: { id },
      data: updateEscuelaDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.escuela.delete({ where: { id } });
  }

  private async validateCue(cue: string, escuelaId?: number) {
    const existente = await this.prisma.escuela.findUnique({
      where: { cue },
      select: { id: true },
    });

    if (existente && existente.id !== escuelaId) {
      throw new ConflictException('Ya existe una escuela con ese CUE.');
    }
  }

  private async validateLocalidad(localidadId: number) {
    const localidad = await this.prisma.localidad.findUnique({
      where: { id: localidadId },
      select: { id: true },
    });

    if (!localidad) {
      throw new BadRequestException(
        `No existe una localidad con id ${localidadId}.`,
      );
    }
  }
}
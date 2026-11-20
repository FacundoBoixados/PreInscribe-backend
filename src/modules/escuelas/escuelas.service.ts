
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

    return this.prisma.escuela.create({
      data: {
        localidad_id: createEscuelaDto.localidadId,
        nombre: createEscuelaDto.nombre,
        cue: createEscuelaDto.cue,
        direccion: createEscuelaDto.direccion,
        telefono: createEscuelaDto.telefono,
        email: createEscuelaDto.email,
        tipo_gestion: createEscuelaDto.tipoGestion,
      },
    });
  }

  findAll() {
    return this.prisma.escuela.findMany();
  }

  async findOne(id: number) {
    const escuela = await this.prisma.escuela.findUnique({
      where: { id },
    });

    if (!escuela) {
      throw new NotFoundException(
        `No existe una escuela con id ${id}.`,
      );
    }

    return escuela;
  }

  async update(id: number, updateEscuelaDto: UpdateEscuelaDto) {
    await this.findOne(id);

    if (updateEscuelaDto.localidadId !== undefined) {
      await this.validateLocalidad(updateEscuelaDto.localidadId);
    }

    if (updateEscuelaDto.cue) {
      await this.validateCue(updateEscuelaDto.cue, id);
    }

    return this.prisma.escuela.update({
      where: { id },
      data: {
        ...(updateEscuelaDto.localidadId !== undefined && {
          localidad_id: updateEscuelaDto.localidadId,
        }),
        ...(updateEscuelaDto.nombre !== undefined && {
          nombre: updateEscuelaDto.nombre,
        }),
        ...(updateEscuelaDto.cue !== undefined && {
          cue: updateEscuelaDto.cue,
        }),
        ...(updateEscuelaDto.direccion !== undefined && {
          direccion: updateEscuelaDto.direccion,
        }),
        ...(updateEscuelaDto.telefono !== undefined && {
          telefono: updateEscuelaDto.telefono,
        }),
        ...(updateEscuelaDto.email !== undefined && {
          email: updateEscuelaDto.email,
        }),
        ...(updateEscuelaDto.tipoGestion !== undefined && {
          tipo_gestion: updateEscuelaDto.tipoGestion,
        }),
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.escuela.delete({
      where: { id },
    });
  }

  private async validateCue(cue: string, escuelaId?: number) {
    const existente = await this.prisma.escuela.findUnique({
      where: { cue },
      select: { id: true },
    });

    if (existente && existente.id !== escuelaId) {
      throw new ConflictException(
        'Ya existe una escuela con ese CUE.',
      );
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

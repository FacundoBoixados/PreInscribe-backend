
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';
import { CreateVacanteDto } from './dto/create-vacante.dto.js';
import { UpdateVacanteDto } from './dto/update-vacante.dto.js';

@Injectable()
export class VacantesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createVacanteDto: CreateVacanteDto) {
    const { escuelaId, gradoId, cicloId, cupoTotal } = createVacanteDto;

    await this.validateVacanteUnica(escuelaId, gradoId, cicloId);

    return this.prisma.vacante.create({
      data: {
        escuela_id: escuelaId,
        grado_id: gradoId,
        ciclo_id: cicloId,
        cupo_total: cupoTotal,
      },
    });
  }

  findAll() {
    return this.prisma.vacante.findMany();
  }

  async findOne(id: number) {
    const vacante = await this.prisma.vacante.findUnique({
      where: { id },
    });

    if (!vacante) {
      throw new NotFoundException(
        `No existe una vacante con id ${id}.`,
      );
    }

    return vacante;
  }

  async update(id: number, updateVacanteDto: UpdateVacanteDto) {
    const actual = await this.findOne(id);

    const { escuelaId, gradoId, cicloId, cupoTotal } = updateVacanteDto;

    if (
      escuelaId !== undefined ||
      gradoId !== undefined ||
      cicloId !== undefined
    ) {
      await this.validateVacanteUnica(
        escuelaId ?? actual.escuela_id,
        gradoId ?? actual.grado_id,
        cicloId ?? actual.ciclo_id,
        id,
      );
    }

    return this.prisma.vacante.update({
      where: { id },
      data: {
        ...(escuelaId !== undefined && { escuela_id: escuelaId }),
        ...(gradoId !== undefined && { grado_id: gradoId }),
        ...(cicloId !== undefined && { ciclo_id: cicloId }),
        ...(cupoTotal !== undefined && { cupo_total: cupoTotal }),
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.vacante.delete({
      where: { id },
    });
  }

  private async validateVacanteUnica(
    escuelaId: number,
    gradoId: number,
    cicloId: number,
    vacanteId?: number,
  ) {
    const existente = await this.prisma.vacante.findFirst({
      where: {
        escuela_id: escuelaId,
        grado_id: gradoId,
        ciclo_id: cicloId,
      },
      select: { id: true },
    });

    if (existente && existente.id !== vacanteId) {
      throw new ConflictException(
        'Ya existe una vacante para esa escuela, grado y ciclo.',
      );
    }
  }
}

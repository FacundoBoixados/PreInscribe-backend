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
    await this.validateVacanteUnica(
      createVacanteDto.escuelaId,
      createVacanteDto.gradoId,
      createVacanteDto.cicloId,
    );

    return this.prisma.vacante.create({ data: createVacanteDto });
  }

  findAll() {
    return this.prisma.vacante.findMany();
  }

  async findOne(id: number) {
    const vacante = await this.prisma.vacante.findUnique({ where: { id } });

    if (!vacante) {
      throw new NotFoundException(`No existe una vacante con id ${id}.`);
    }

    return vacante;
  }

  async update(id: number, updateVacanteDto: UpdateVacanteDto) {
    const actual = await this.findOne(id);

    if (
      updateVacanteDto.escuelaId ||
      updateVacanteDto.gradoId ||
      updateVacanteDto.cicloId
    ) {
      await this.validateVacanteUnica(
        updateVacanteDto.escuelaId ?? actual.escuelaId,
        updateVacanteDto.gradoId ?? actual.gradoId,
        updateVacanteDto.cicloId ?? actual.cicloId,
        id,
      );
    }

    return this.prisma.vacante.update({
      where: { id },
      data: updateVacanteDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.vacante.delete({ where: { id } });
  }

  private async validateVacanteUnica(
    escuelaId: number,
    gradoId: number,
    cicloId: number,
    vacanteId?: number,
  ) {
    const existente = await this.prisma.vacante.findFirst({
      where: { escuelaId, gradoId, cicloId },
      select: { id: true },
    });

    if (existente && existente.id !== vacanteId) {
      throw new ConflictException(
        'Ya existe una vacante para esa escuela, grado y ciclo.',
      );
    }
  }
}
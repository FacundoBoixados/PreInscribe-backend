import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateGradoDto } from './dto/create-grado.dto.js';
import { UpdateGradoDto } from './dto/update-grado.dto.js';
import { CreateCicloLectivoDto } from './dto/create-ciclo-lectivo.dto.js';
import { UpdateCicloLectivoDto } from './dto/update-ciclo-lectivo.dto.js';
import { CreatePeriodoPreinscripcionDto } from './dto/create-periodo-preinscripcion.dto.js';
import { UpdatePeriodoPreinscripcionDto } from './dto/update-periodo-preinscripcion.dto.js';

@Injectable()
export class NivelesGradosService {
  constructor(private readonly prisma: PrismaService) {}

  // ---------- Niveles educativos (solo lectura) ----------

  findAllNiveles() {
    return this.prisma.nivelEducativo.findMany({ include: { grados: true } });
  }

  // ---------- Grados ----------

  async createGrado(dto: CreateGradoDto) {
    await this.validateGradoUnico(dto.nivelId, dto.nombre);

    return this.prisma.grado.create({ data: dto });
  }

  findAllGrados() {
    return this.prisma.grado.findMany();
  }

  async findOneGrado(id: number) {
    const grado = await this.prisma.grado.findUnique({ where: { id } });

    if (!grado) {
      throw new NotFoundException(`No existe un grado con id ${id}.`);
    }

    return grado;
  }

  async updateGrado(id: number, dto: UpdateGradoDto) {
    const actual = await this.findOneGrado(id);

    if (dto.nivelId || dto.nombre) {
      await this.validateGradoUnico(
        dto.nivelId ?? actual.nivelId,
        dto.nombre ?? actual.nombre,
        id,
      );
    }

    return this.prisma.grado.update({ where: { id }, data: dto });
  }

  async removeGrado(id: number) {
    await this.findOneGrado(id);

    return this.prisma.grado.delete({ where: { id } });
  }

  // ---------- Ciclos lectivos ----------

  async createCicloLectivo(dto: CreateCicloLectivoDto) {
    await this.validateAnio(dto.anio);

    return this.prisma.cicloLectivo.create({ data: dto });
  }

  findAllCiclosLectivos() {
    return this.prisma.cicloLectivo.findMany();
  }

  async findOneCicloLectivo(id: number) {
    const ciclo = await this.prisma.cicloLectivo.findUnique({ where: { id } });

    if (!ciclo) {
      throw new NotFoundException(`No existe un ciclo lectivo con id ${id}.`);
    }

    return ciclo;
  }

  async updateCicloLectivo(id: number, dto: UpdateCicloLectivoDto) {
    await this.findOneCicloLectivo(id);

    if (dto.anio) {
      await this.validateAnio(dto.anio, id);
    }

    return this.prisma.cicloLectivo.update({ where: { id }, data: dto });
  }

  async removeCicloLectivo(id: number) {
    await this.findOneCicloLectivo(id);

    return this.prisma.cicloLectivo.delete({ where: { id } });
  }

  // ---------- Períodos de preinscripción ----------

  async createPeriodo(dto: CreatePeriodoPreinscripcionDto) {
    await this.validatePeriodoUnico(dto.escuelaId, dto.cicloId);

    return this.prisma.periodoPreinscripcion.create({
      data: {
        ...dto,
        fechaInicio: new Date(dto.fechaInicio),
        fechaFin: new Date(dto.fechaFin),
      },
    });
  }

  findAllPeriodos() {
    return this.prisma.periodoPreinscripcion.findMany();
  }

  async findOnePeriodo(id: number) {
    const periodo = await this.prisma.periodoPreinscripcion.findUnique({
      where: { id },
    });

    if (!periodo) {
      throw new NotFoundException(`No existe un período con id ${id}.`);
    }

    return periodo;
  }

  async updatePeriodo(id: number, dto: UpdatePeriodoPreinscripcionDto) {
    const actual = await this.findOnePeriodo(id);

    if (dto.escuelaId || dto.cicloId) {
      await this.validatePeriodoUnico(
        dto.escuelaId ?? actual.escuelaId,
        dto.cicloId ?? actual.cicloId,
        id,
      );
    }

    const { fechaInicio, fechaFin, ...resto } = dto;

    return this.prisma.periodoPreinscripcion.update({
      where: { id },
      data: {
        ...resto,
        ...(fechaInicio && { fechaInicio: new Date(fechaInicio) }),
        ...(fechaFin && { fechaFin: new Date(fechaFin) }),
      },
    });
  }

  async removePeriodo(id: number) {
    await this.findOnePeriodo(id);

    return this.prisma.periodoPreinscripcion.delete({ where: { id } });
  }

  // ---------- Validaciones de campos únicos ----------

  private async validateGradoUnico(
    nivelId: number,
    nombre: string,
    gradoId?: number,
  ) {
    const existente = await this.prisma.grado.findFirst({
      where: { nivelId, nombre },
      select: { id: true },
    });

    if (existente && existente.id !== gradoId) {
      throw new ConflictException('Ya existe un grado con ese nombre en el nivel.');
    }
  }

  private async validateAnio(anio: number, cicloId?: number) {
    const existente = await this.prisma.cicloLectivo.findUnique({
      where: { anio },
      select: { id: true },
    });

    if (existente && existente.id !== cicloId) {
      throw new ConflictException('Ya existe un ciclo lectivo con ese año.');
    }
  }

  private async validatePeriodoUnico(
    escuelaId: number,
    cicloId: number,
    periodoId?: number,
  ) {
    const existente = await this.prisma.periodoPreinscripcion.findFirst({
      where: { escuelaId, cicloId },
      select: { id: true },
    });

    if (existente && existente.id !== periodoId) {
      throw new ConflictException(
        'Ya existe un período de preinscripción para esa escuela y ciclo.',
      );
    }
  }
}
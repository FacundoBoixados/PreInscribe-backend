
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
    return this.prisma.nivel_educativo.findMany();
  }

  // ---------- Grados ----------

  async createGrado(dto: CreateGradoDto) {
    await this.validateGradoUnico(dto.nivelId, dto.nombre);

    return this.prisma.grado.create({
      data: {
        nivel_id: dto.nivelId,
        nombre: dto.nombre,
        orden: dto.orden,
        edad_minima: dto.edadMinima,
        edad_maxima: dto.edadMaxima,
      },
    });
  }

  findAllGrados() {
    return this.prisma.grado.findMany();
  }

  async findOneGrado(id: number) {
    const grado = await this.prisma.grado.findUnique({
      where: { id },
    });

    if (!grado) {
      throw new NotFoundException(`No existe un grado con id ${id}.`);
    }

    return grado;
  }

  async updateGrado(id: number, dto: UpdateGradoDto) {
    const actual = await this.findOneGrado(id);

    if (dto.nivelId !== undefined || dto.nombre !== undefined) {
      await this.validateGradoUnico(
        dto.nivelId ?? actual.nivel_id,
        dto.nombre ?? actual.nombre,
        id,
      );
    }

    return this.prisma.grado.update({
      where: { id },
      data: {
        ...(dto.nivelId !== undefined && { nivel_id: dto.nivelId }),
        ...(dto.nombre !== undefined && { nombre: dto.nombre }),
        ...(dto.orden !== undefined && { orden: dto.orden }),
        ...(dto.edadMinima !== undefined && {
          edad_minima: dto.edadMinima,
        }),
        ...(dto.edadMaxima !== undefined && {
          edad_maxima: dto.edadMaxima,
        }),
      },
    });
  }

  async removeGrado(id: number) {
    await this.findOneGrado(id);

    return this.prisma.grado.delete({
      where: { id },
    });
  }

  // ---------- Ciclos lectivos ----------

  async createCicloLectivo(dto: CreateCicloLectivoDto) {
    await this.validateAnio(dto.anio);

    return this.prisma.ciclo_lectivo.create({
      data: dto,
    });
  }

  findAllCiclosLectivos() {
    return this.prisma.ciclo_lectivo.findMany();
  }

  async findOneCicloLectivo(id: number) {
    const ciclo = await this.prisma.ciclo_lectivo.findUnique({
      where: { id },
    });

    if (!ciclo) {
      throw new NotFoundException(
        `No existe un ciclo lectivo con id ${id}.`,
      );
    }

    return ciclo;
  }

  async updateCicloLectivo(id: number, dto: UpdateCicloLectivoDto) {
    await this.findOneCicloLectivo(id);

    if (dto.anio !== undefined) {
      await this.validateAnio(dto.anio, id);
    }

    return this.prisma.ciclo_lectivo.update({
      where: { id },
      data: dto,
    });
  }

  async removeCicloLectivo(id: number) {
    await this.findOneCicloLectivo(id);

    return this.prisma.ciclo_lectivo.delete({
      where: { id },
    });
  }

  // ---------- Períodos de preinscripción ----------

  async createPeriodo(dto: CreatePeriodoPreinscripcionDto) {
    await this.validatePeriodoUnico(dto.escuelaId, dto.cicloId);

    return this.prisma.periodo_preinscripcion.create({
      data: {
        escuela_id: dto.escuelaId,
        ciclo_id: dto.cicloId,
        fecha_inicio: new Date(dto.fechaInicio),
        fecha_fin: new Date(dto.fechaFin),
      },
    });
  }

  findAllPeriodos() {
    return this.prisma.periodo_preinscripcion.findMany();
  }

  async findOnePeriodo(id: number) {
    const periodo = await this.prisma.periodo_preinscripcion.findUnique({
      where: { id },
    });

    if (!periodo) {
      throw new NotFoundException(
        `No existe un período con id ${id}.`,
      );
    }

    return periodo;
  }

  async updatePeriodo(id: number, dto: UpdatePeriodoPreinscripcionDto) {
    const actual = await this.findOnePeriodo(id);

    if (
      dto.escuelaId !== undefined ||
      dto.cicloId !== undefined
    ) {
      await this.validatePeriodoUnico(
        dto.escuelaId ?? actual.escuela_id,
        dto.cicloId ?? actual.ciclo_id,
        id,
      );
    }

    return this.prisma.periodo_preinscripcion.update({
      where: { id },
      data: {
        ...(dto.escuelaId !== undefined && {
          escuela_id: dto.escuelaId,
        }),
        ...(dto.cicloId !== undefined && {
          ciclo_id: dto.cicloId,
        }),
        ...(dto.fechaInicio !== undefined && {
          fecha_inicio: new Date(dto.fechaInicio),
        }),
        ...(dto.fechaFin !== undefined && {
          fecha_fin: new Date(dto.fechaFin),
        }),
      },
    });
  }

  async removePeriodo(id: number) {
    await this.findOnePeriodo(id);

    return this.prisma.periodo_preinscripcion.delete({
      where: { id },
    });
  }

  // ---------- Validaciones de campos únicos ----------

  private async validateGradoUnico(
    nivelId: number,
    nombre: string,
    gradoId?: number,
  ) {
    const existente = await this.prisma.grado.findFirst({
      where: {
        nivel_id: nivelId,
        nombre,
      },
      select: { id: true },
    });

    if (existente && existente.id !== gradoId) {
      throw new ConflictException(
        'Ya existe un grado con ese nombre en el nivel.',
      );
    }
  }

  private async validateAnio(anio: number, cicloId?: number) {
    const existente = await this.prisma.ciclo_lectivo.findUnique({
      where: { anio },
      select: { id: true },
    });

    if (existente && existente.id !== cicloId) {
      throw new ConflictException(
        'Ya existe un ciclo lectivo con ese año.',
      );
    }
  }

  private async validatePeriodoUnico(
    escuelaId: number,
    cicloId: number,
    periodoId?: number,
  ) {
    const existente = await this.prisma.periodo_preinscripcion.findFirst({
      where: {
        escuela_id: escuelaId,
        ciclo_id: cicloId,
      },
      select: { id: true },
    });

    if (existente && existente.id !== periodoId) {
      throw new ConflictException(
        'Ya existe un período de preinscripción para esa escuela y ciclo.',
      );
    }
  }
}

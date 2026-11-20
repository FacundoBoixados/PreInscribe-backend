
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';
import { CreatePreinscripcionDto } from './dto/create-preinscripcione.dto.js';
import { UpdatePreinscripcionDto } from './dto/update-preinscripcione.dto.js';

@Injectable()
export class PreinscripcionesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPreinscripcionDto: CreatePreinscripcionDto) {
    const { alumnoId, escuelaId, gradoId, cicloId, observaciones, tieneHermanoEnEscuela } =
      createPreinscripcionDto;

    await this.validateVacante(escuelaId, gradoId, cicloId);
    await this.validatePreinscripcionUnica(
      alumnoId,
      escuelaId,
      gradoId,
      cicloId,
    );

    const estadoInicial = await this.prisma.estado_preinscripcion.findUnique({
      where: { nombre: 'PENDIENTE' },
      select: { id: true },
    });

    if (!estadoInicial) {
      throw new BadRequestException(
        'No existe el estado PENDIENTE. Cargá los estados iniciales en la base.',
      );
    }

    return this.prisma.preinscripcion.create({
      data: {
        alumno_id: alumnoId,
        escuela_id: escuelaId,
        grado_id: gradoId,
        ciclo_id: cicloId,
        estado_id: estadoInicial.id,
        ...(observaciones !== undefined && { observaciones }),
        ...(tieneHermanoEnEscuela !== undefined && {
          tiene_hermano_en_escuela: tieneHermanoEnEscuela,
        }),
      },
    });
  }

  findAll() {
    return this.prisma.preinscripcion.findMany();
  }

  async findOne(id: number) {
    const preinscripcion = await this.prisma.preinscripcion.findUnique({
      where: { id },
    });

    if (!preinscripcion) {
      throw new NotFoundException(
        `No existe una preinscripción con id ${id}.`,
      );
    }

    return preinscripcion;
  }

  async update(
    id: number,
    updatePreinscripcionDto: UpdatePreinscripcionDto,
  ) {
    const actual = await this.findOne(id);

    const {
      alumnoId,
      escuelaId,
      gradoId,
      cicloId,
      observaciones,
      tieneHermanoEnEscuela,
    } = updatePreinscripcionDto;

    if (
      alumnoId !== undefined ||
      escuelaId !== undefined ||
      gradoId !== undefined ||
      cicloId !== undefined
    ) {
      const alumno = alumnoId ?? actual.alumno_id;
      const escuela = escuelaId ?? actual.escuela_id;
      const grado = gradoId ?? actual.grado_id;
      const ciclo = cicloId ?? actual.ciclo_id;

      await this.validateVacante(escuela, grado, ciclo);
      await this.validatePreinscripcionUnica(
        alumno,
        escuela,
        grado,
        ciclo,
        id,
      );
    }

    return this.prisma.preinscripcion.update({
      where: { id },
      data: {
        ...(alumnoId !== undefined && { alumno_id: alumnoId }),
        ...(escuelaId !== undefined && { escuela_id: escuelaId }),
        ...(gradoId !== undefined && { grado_id: gradoId }),
        ...(cicloId !== undefined && { ciclo_id: cicloId }),
        ...(observaciones !== undefined && { observaciones }),
        ...(tieneHermanoEnEscuela !== undefined && {
          tiene_hermano_en_escuela: tieneHermanoEnEscuela,
        }),
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.preinscripcion.delete({
      where: { id },
    });
  }

  private async validateVacante(
    escuelaId: number,
    gradoId: number,
    cicloId: number,
  ) {
    const vacante = await this.prisma.vacante.findFirst({
      where: {
        escuela_id: escuelaId,
        grado_id: gradoId,
        ciclo_id: cicloId,
      },
      select: { id: true },
    });

    if (!vacante) {
      throw new BadRequestException(
        'No existe una vacante para esa escuela, grado y ciclo.',
      );
    }
  }

  private async validatePreinscripcionUnica(
    alumnoId: number,
    escuelaId: number,
    gradoId: number,
    cicloId: number,
    preinscripcionId?: number,
  ) {
    const existente = await this.prisma.preinscripcion.findFirst({
      where: {
        alumno_id: alumnoId,
        escuela_id: escuelaId,
        grado_id: gradoId,
        ciclo_id: cicloId,
      },
      select: { id: true },
    });

    if (existente && existente.id !== preinscripcionId) {
      throw new ConflictException(
        'El alumno ya está preinscripto en esa escuela, grado y ciclo.',
      );
    }
  }
}

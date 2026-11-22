
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateAlumnoDto } from './dto/create-alumno.dto.js';
import { UpdateAlumnoDto } from './dto/update-alumno.dto.js';

@Injectable()
export class AlumnosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAlumnoDto: CreateAlumnoDto) {
    await this.validateDni(createAlumnoDto.dni);

    const { fechaNacimiento, tutorId, ...resto } = createAlumnoDto;

    return this.prisma.alumno.create({
      data: {
        ...resto,
        tutor_id: tutorId,
        fecha_nacimiento: new Date(fechaNacimiento),
      },
    });
  }

  findAll() {
    return this.prisma.alumno.findMany({ where: { activo: true } });
  }

  async findOne(id: number) {
    const alumno = await this.prisma.alumno.findUnique({ 
      where: { id, activo: true }, 
    });

    if (!alumno) {
      throw new NotFoundException(`No existe un alumno con id ${id}.`);
    }

    return alumno;
  }

  async update(id: number, updateAlumnoDto: UpdateAlumnoDto) {
    await this.findOne(id);

    if (updateAlumnoDto.dni) {
      await this.validateDni(updateAlumnoDto.dni, id);
    }

    const { fechaNacimiento, tutorId, ...resto } = updateAlumnoDto;

    return this.prisma.alumno.update({
      where: { id },
      data: {
        ...resto,
        ...(tutorId !== undefined && { tutor_id: tutorId }),
        ...(fechaNacimiento && {
          fecha_nacimiento: new Date(fechaNacimiento),
        }),
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.alumno.update({ 
      where: { id },
      data: { activo: false },
    });
  }

  private async validateDni(dni: string, alumnoId?: number) {
    const existente = await this.prisma.alumno.findUnique({
      where: { dni },
      select: { id: true },
    });

    if (existente && existente.id !== alumnoId) {
      throw new ConflictException('Ya existe un alumno con ese DNI.');
    }
  }
}

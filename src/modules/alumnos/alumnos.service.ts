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

    return this.prisma.alumno.create({
      data: {
        ...createAlumnoDto,
        fechaNacimiento: new Date(createAlumnoDto.fechaNacimiento),
      },
    });
  }

  findAll() {
    return this.prisma.alumno.findMany();
  }

  async findOne(id: number) {
    const alumno = await this.prisma.alumno.findUnique({ where: { id } });

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

    const { fechaNacimiento, ...resto } = updateAlumnoDto;

    return this.prisma.alumno.update({
      where: { id },
      data: {
        ...resto,
        ...(fechaNacimiento && { fechaNacimiento: new Date(fechaNacimiento) }),
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.alumno.delete({ where: { id } });
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
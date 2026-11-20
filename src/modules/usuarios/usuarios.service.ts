
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';
import { CreateUsuarioDto } from './dto/create-usuario.dto.js';
import { UpdateUsuarioDto } from './dto/update-usuario.dto.js';

@Injectable()
export class UsuariosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const email = createUsuarioDto.email.toLowerCase();

    await this.validateDni(createUsuarioDto.dni);
    await this.validateEmail(email);
    await this.validateRol(createUsuarioDto.rolId);

    return this.prisma.usuario.create({
      data: { ...createUsuarioDto, email },
      omit: { passwordHash: true },
    });
  }

  findAll() {
    return this.prisma.usuario.findMany({
      omit: { passwordHash: true },
    });
  }

  async findOne(id: number) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id },
      omit: { passwordHash: true },
    });

    if (!usuario) {
      throw new NotFoundException(
        `No existe un usuario con id ${id}.`,
      );
    }

    return usuario;
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    await this.findOne(id);

    if (updateUsuarioDto.dni) {
      await this.validateDni(updateUsuarioDto.dni, id);
    }

    if (updateUsuarioDto.email) {
      updateUsuarioDto.email = updateUsuarioDto.email.toLowerCase();
      await this.validateEmail(updateUsuarioDto.email, id);
    }

    if (updateUsuarioDto.rolId) {
      await this.validateRol(updateUsuarioDto.rolId);
    }

    return this.prisma.usuario.update({
      where: { id },
      data: updateUsuarioDto,
      omit: { passwordHash: true },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.usuario.delete({
      where: { id },
      omit: { passwordHash: true },
    });
  }

  private async validateDni(dni: string, usuarioId?: number) {
    const existente = await this.prisma.usuario.findUnique({
      where: { dni },
      select: { id: true },
    });

    if (existente && existente.id !== usuarioId) {
      throw new ConflictException(
        'Ya existe un usuario con ese DNI.',
      );
    }
  }

  private async validateEmail(email: string, usuarioId?: number) {
    const existente = await this.prisma.usuario.findFirst({
      where: { email },
      select: { id: true },
    });

    if (existente && existente.id !== usuarioId) {
      throw new ConflictException(
        'Ya existe un usuario con ese email.',
      );
    }
  }

  private async validateRol(rolId: number) {
    const rol = await this.prisma.rol.findUnique({
      where: { id: rolId },
      select: { id: true },
    });

    if (!rol) {
      throw new BadRequestException(
        `No existe un rol con id ${rolId}.`,
      );
    }
  }
}

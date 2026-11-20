
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';
import { CreateAuthDto } from './dto/create-auth.dto.js';
import { LoginAuthDto } from './dto/login-auth.dto.js';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async register(createAuthDto: CreateAuthDto) {
    const email = createAuthDto.email.trim().toLowerCase();
    const dni = createAuthDto.dni.trim();

    // Verificar si el DNI o email ya existen
    const usuarioExistente = await this.prisma.usuario.findFirst({
      where: {
        OR: [{ email }, { dni }],
      },
    });

    if (usuarioExistente) {
      if (usuarioExistente.email === email) {
        throw new ConflictException('El email ya se encuentra registrado.');
      }

      throw new ConflictException('El DNI ya se encuentra registrado.');
    }

    // Buscar el rol FAMILIA
    const rolFamilia = await this.prisma.rol.findUnique({
      where: {
        nombre: 'FAMILIA',
      },
    });

    if (!rolFamilia) {
      throw new NotFoundException('No se encontró el rol FAMILIA.');
    }

    // Encriptar contraseña
    const passwordHash = await bcrypt.hash(createAuthDto.password, 10);

    // Crear usuario
    const usuario = await this.prisma.usuario.create({
      data: {
        nombre: createAuthDto.nombre.trim(),
        apellido: createAuthDto.apellido.trim(),
        dni,
        email,
        telefono: createAuthDto.telefono?.trim(),
        passwordHash,
        rolId: rolFamilia.id,
      },
      select: {
        id: true,
        nombre: true,
        apellido: true,
        dni: true,
        email: true,
        telefono: true,
        activo: true,
        rol: {
          select: {
            nombre: true,
          },
        },
      },
    });

    return {
      message: 'Usuario registrado correctamente.',
      usuario,
    };
  }

  login(loginAuthDto: LoginAuthDto) {
    return 'Inicio de sesión pendiente de implementar';
  }
}

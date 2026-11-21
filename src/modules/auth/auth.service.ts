
import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateAuthDto } from './dto/create-auth.dto.js';
import { LoginAuthDto } from './dto/login-auth.dto.js';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

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

  async login(loginAuthDto: LoginAuthDto) {
    const email = loginAuthDto.email.trim().toLowerCase();

    // Buscar usuario por email
    const usuario = await this.prisma.usuario.findFirst({
      where: { email },
      include: {
        rol: true,
      },
    });

    // Verificar si existe y está activo
    if (!usuario || !usuario.activo) {
      throw new UnauthorizedException('Credenciales incorrectas.');
    }

    // Comparar contraseña ingresada con el hash almacenado
    const passwordValida = await bcrypt.compare(
      loginAuthDto.password,
      usuario.passwordHash,
    );

    if (!passwordValida) {
      throw new UnauthorizedException('Credenciales incorrectas.');
    }

    // Generar token JWT
    const payload = {
      sub: usuario.id,
      email: usuario.email,
      rol: usuario.rol.nombre,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    // Devolver token y datos seguros del usuario
    return {
      message: 'Inicio de sesión exitoso.',
      access_token: accessToken,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        dni: usuario.dni,
        email: usuario.email,
        telefono: usuario.telefono,
        activo: usuario.activo,
        rol: usuario.rol.nombre,
      },
    };
  }
}

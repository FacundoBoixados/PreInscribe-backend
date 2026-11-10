import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto.js';
import { LoginAuthDto } from './dto/login-auth.dto.js';

@Injectable()
export class AuthService {
  register(createAuthDto: CreateAuthDto) {
    return 'Registro de usuario pendiente de implementar';
  }

  login(loginAuthDto: LoginAuthDto) {
    return 'Inicio de sesión pendiente de implementar';
  }
}
import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from './modules/auth/auth.module.js';
import { UsuariosModule } from './modules/usuarios/usuarios.module.js';
import { AlumnosModule } from './modules/alumnos/alumnos.module.js';
import { PreinscripcionesModule } from './modules/preinscripciones/preinscripciones.module.js';
import { DocumentosModule } from './modules/documentos/documentos.module.js';

@Module({
  imports: [AuthModule, UsuariosModule, AlumnosModule, PreinscripcionesModule, DocumentosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

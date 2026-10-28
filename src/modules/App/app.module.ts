import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from '../auth/auth.module.js';
import { UsuariosModule } from '../usuarios/usuarios.module.js';
import { AlumnosModule } from '../alumnos/alumnos.module.js';
import { PreinscripcionesModule } from '../preinscripciones/preinscripciones.module.js';
import { DocumentosModule } from '../documentos/documentos.module.js';
import { EscuelasModule } from '../escuelas/escuelas.module.js';
import { EvaluacionesModule } from '../evaluaciones/evaluaciones.module.js';
import { NivelesGradosModule } from '../niveles-grados/niveles-grados.module.js';
import { VacantesModule } from '../vacantes/vacantes.module.js';

@Module({
  imports: [AuthModule, UsuariosModule, AlumnosModule, PreinscripcionesModule, DocumentosModule, EscuelasModule, EvaluacionesModule, NivelesGradosModule, VacantesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

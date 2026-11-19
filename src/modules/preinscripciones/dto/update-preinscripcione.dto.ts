import { PartialType } from '@nestjs/mapped-types'; // o '@nestjs/swagger' si usas Swagger
import { CreatePreinscripcionDto } from './create-preinscripcione.dto.js';

export class UpdatePreinscripcionDto extends PartialType(
  CreatePreinscripcionDto,
) {}
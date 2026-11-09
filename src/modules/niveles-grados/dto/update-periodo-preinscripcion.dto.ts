import { PartialType } from '@nestjs/mapped-types';
import { CreatePeriodoPreinscripcionDto } from './create-periodo-preinscripcion.dto.js';

export class UpdatePeriodoPreinscripcionDto extends PartialType(CreatePeriodoPreinscripcionDto) {}
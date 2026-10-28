import { PartialType } from '@nestjs/mapped-types';
import { CreatePreinscripcioneDto } from './create-preinscripcione.dto.js';

export class UpdatePreinscripcioneDto extends PartialType(CreatePreinscripcioneDto) {}

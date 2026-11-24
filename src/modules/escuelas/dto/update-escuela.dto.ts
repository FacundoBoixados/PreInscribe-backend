import { PartialType } from '@nestjs/mapped-types';
import { CreateEscuelaDto } from './create-escuela.dto.js';

export class UpdateEscuelaDto extends PartialType(CreateEscuelaDto) {}

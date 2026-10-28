import { PartialType } from '@nestjs/mapped-types';
import { CreateNivelesGradoDto } from './create-niveles-grado.dto.js';

export class UpdateNivelesGradoDto extends PartialType(CreateNivelesGradoDto) {}

import { PartialType } from '@nestjs/mapped-types';
import { CreateCicloLectivoDto } from './create-ciclo-lectivo.dto.js';

export class UpdateCicloLectivoDto extends PartialType(CreateCicloLectivoDto) {}
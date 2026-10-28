import { PartialType } from '@nestjs/mapped-types';
import { CreateEvaluacioneDto } from './create-evaluacione.dto.js';

export class UpdateEvaluacioneDto extends PartialType(CreateEvaluacioneDto) {}

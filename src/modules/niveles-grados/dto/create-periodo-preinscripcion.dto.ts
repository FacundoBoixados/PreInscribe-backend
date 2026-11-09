import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

export class CreatePeriodoPreinscripcionDto {
  @IsNumber()
  @IsNotEmpty({ message: 'El ID de la escuela es obligatorio' })
  escuela_id: number;

  @IsNumber()
  @IsNotEmpty({ message: 'El ID del ciclo lectivo es obligatorio' })
  ciclo_id: number;

  @IsDateString({}, { message: 'La fecha de inicio debe tener un formato válido (YYYY-MM-DD)' })
  @IsNotEmpty({ message: 'La fecha de inicio es obligatoria' })
  fecha_inicio: string;

  @IsDateString({}, { message: 'La fecha de fin debe tener un formato válido (YYYY-MM-DD)' })
  @IsNotEmpty({ message: 'La fecha de fin es obligatoria' })
  fecha_fin: string;
}
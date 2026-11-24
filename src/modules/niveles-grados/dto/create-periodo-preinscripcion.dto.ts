import { IsDateString, IsInt, IsNotEmpty } from 'class-validator';

export class CreatePeriodoPreinscripcionDto {
  @IsInt()
  @IsNotEmpty({ message: 'El ID de la escuela es obligatorio' })
  escuelaId: number;

  @IsInt()
  @IsNotEmpty({ message: 'El ID del ciclo lectivo es obligatorio' })
  cicloId: number;

  @IsDateString({}, { message: 'La fecha de inicio debe tener un formato válido (YYYY-MM-DD)' })
  @IsNotEmpty({ message: 'La fecha de inicio es obligatoria' })
  fechaInicio: string;

  @IsDateString({}, { message: 'La fecha de fin debe tener un formato válido (YYYY-MM-DD)' })
  @IsNotEmpty({ message: 'La fecha de fin es obligatoria' })
  fechaFin: string;
}
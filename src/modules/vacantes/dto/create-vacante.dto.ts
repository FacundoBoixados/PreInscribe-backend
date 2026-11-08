import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  Min,
} from 'class-validator';

export class CreateVacanteDto {
  @IsNumber()
  @IsNotEmpty({ message: 'El ID de la escuela es obligatorio' })
  escuela_id: number;

  @IsNumber()
  @IsNotEmpty({ message: 'El ID del grado es obligatorio' })
  grado_id: number;

  @IsNumber()
  @IsNotEmpty({ message: 'El ID del ciclo lectivo es obligatorio' })
  ciclo_id: number;

  @IsInt({ message: 'El cupo total debe ser un número entero' })
  @Min(0, { message: 'El cupo total no puede ser negativo' })
  @IsNotEmpty({ message: 'El cupo total es obligatorio' })
  cupo_total: number;
}
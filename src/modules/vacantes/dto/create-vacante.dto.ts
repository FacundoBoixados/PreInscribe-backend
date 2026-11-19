import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class CreateVacanteDto {
  @IsInt()
  @IsNotEmpty({ message: 'El ID de la escuela es obligatorio' })
  escuelaId: number;

  @IsInt()
  @IsNotEmpty({ message: 'El ID del grado es obligatorio' })
  gradoId: number;

  @IsInt()
  @IsNotEmpty({ message: 'El ID del ciclo lectivo es obligatorio' })
  cicloId: number;

  @IsInt({ message: 'El cupo total debe ser un número entero' })
  @Min(0, { message: 'El cupo total no puede ser negativo' })
  @IsNotEmpty({ message: 'El cupo total es obligatorio' })
  cupoTotal: number;
}
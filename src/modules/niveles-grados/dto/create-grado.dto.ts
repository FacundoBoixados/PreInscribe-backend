import { IsInt, IsNotEmpty, IsString, MaxLength, Min } from 'class-validator';

export class CreateGradoDto {
  @IsInt()
  @IsNotEmpty({ message: 'El ID del nivel educativo es obligatorio' })
  nivelId: number;

  @IsString()
  @IsNotEmpty({ message: 'El nombre del grado es obligatorio' })
  @MaxLength(40)
  nombre: string; // ej: "Sala de 4", "1° grado", "3° año"

  @IsInt()
  @IsNotEmpty({ message: 'El orden es obligatorio' })
  orden: number;

  @IsInt()
  @IsNotEmpty({ message: 'La edad mínima es obligatoria' })
  @Min(0, { message: 'La edad mínima no puede ser negativa' })
  edadMinima: number;

  @IsInt()
  @IsNotEmpty({ message: 'La edad máxima es obligatoria' })
  @Min(0, { message: 'La edad máxima no puede ser negativa' })
  edadMaxima: number;
}
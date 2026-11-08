import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateGradoDto {
  @IsNumber()
  @IsNotEmpty({ message: 'El ID del nivel educativo es obligatorio' })
  nivel_id: number;

  @IsString()
  @IsNotEmpty({ message: 'El nombre del grado es obligatorio' })
  @MaxLength(15)
  nombre: string; // ej: "Sala de 4", "1° grado", "3° año"

  @IsNumber()
  @IsNotEmpty({ message: 'El orden es obligatorio' })
  orden: number;

  @IsNumber()
  @IsNotEmpty({ message: 'La edad mínima es obligatoria' })
  @Min(0, { message: 'La edad mínima no puede ser negativa' })
  edad_minima: number;

  @IsNumber()
  @IsNotEmpty({ message: 'La edad máxima es obligatoria' })
  @Min(0, { message: 'La edad máxima no puede ser negativa' })
  edad_maxima: number;
}
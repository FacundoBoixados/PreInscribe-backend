
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  Length,
  Matches,
  IsDateString,
} from 'class-validator';

export class CreateAlumnoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  apellido: string;

  @IsString()
  @Length(7, 8)
  @Matches(/^\d+$/)
  dni: string;

  @IsDateString()
  @IsNotEmpty()
  fecha_nacimiento: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  parentesco: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  domicilio?: string;

  @IsOptional()
  @IsString()
  observaciones?: string;
}

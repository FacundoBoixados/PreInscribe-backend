
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Length,
  Matches,
  MaxLength,
} from 'class-validator';

export class CreateAlumnoDto {
  @IsInt()
  @IsPositive()
  tutorId!: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  nombre!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  apellido!: string;

  @IsString()
  @Length(7, 8)
  @Matches(/^\d+$/)
  dni!: string;

  @IsDateString()
  @IsNotEmpty()
  fechaNacimiento!: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  parentesco?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  domicilio?: string;

  @IsOptional()
  @IsString()
  observaciones?: string;
}

import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreatePreinscripcionDto {
  @IsInt()
  @IsPositive()
  alumnoId: number;

  @IsInt()
  @IsPositive()
  escuelaId: number;

  @IsInt()
  @IsPositive()
  gradoId: number;

  @IsInt()
  @IsPositive()
  cicloId: number;

  @IsOptional()
  @IsBoolean()
  tieneHermanoEnEscuela?: boolean;

  @IsOptional()
  @IsString()
  observaciones?: string;
}
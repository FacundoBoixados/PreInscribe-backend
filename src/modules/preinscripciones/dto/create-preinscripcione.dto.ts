import {
  IsInt,
  IsPositive,
  IsBoolean,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePreinscripcionDto {
  @IsInt()
  @IsPositive()
  alumno_id: number;

  @IsInt()
  @IsPositive()
  escuela_id: number;

  @IsInt()
  @IsPositive()
  grado_id: number;

  @IsInt()
  @IsPositive()
  ciclo_id: number;

  @IsOptional()
  @IsBoolean()
  tiene_hermano_en_escuela?: boolean;

  @IsOptional()
  @IsString()
  observaciones?: string;
}
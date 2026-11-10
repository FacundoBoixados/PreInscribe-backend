import {
  IsBoolean,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdatePreinscripcionDto {
  @IsOptional()
  @IsBoolean()
  tiene_hermano_en_escuela?: boolean;

  @IsOptional()
  @IsString()
  observaciones?: string;
}

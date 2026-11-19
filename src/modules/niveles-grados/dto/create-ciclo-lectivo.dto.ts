import {
  IsBoolean,
  IsNotEmpty,
  IsInt,
  IsOptional,
  Max,
  Min,
} from 'class-validator';

export class CreateCicloLectivoDto {
  @IsInt()
  @IsNotEmpty({ message: 'El año del ciclo lectivo es obligatorio' })
  @Min(2020, { message: 'El año mínimo es 2020' })
  @Max(2100, { message: 'El año máximo es 2100' })
  anio: number;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}
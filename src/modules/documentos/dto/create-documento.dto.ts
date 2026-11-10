import {
  IsInt,
  IsPositive,
} from 'class-validator';

export class CreateDocumentoDto {
  @IsInt()
  @IsPositive()
  preinscripcion_id: number;

  @IsInt()
  @IsPositive()
  tipo_documento_id: number;
}

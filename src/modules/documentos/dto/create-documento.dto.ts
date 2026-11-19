import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateDocumentoDto {
  @IsInt()
  @IsPositive()
  preinscripcionId: number;

  @IsInt()
  @IsPositive()
  tipoDocumentoId: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  nombreArchivo: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(400)
  rutaArchivo: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  mimeType: string; // ej: "application/pdf", "image/jpeg"

  @IsInt()
  @IsPositive()
  tamanoBytes: number;
}
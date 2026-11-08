import {
  IsIn,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateEscuelaDto {
  @IsNumber()
  @IsNotEmpty({ message: 'El ID de la localidad es obligatorio' })
  localidad_id: number;

  @IsString()
  @IsNotEmpty({ message: 'El nombre de la escuela es obligatorio' })
  @MaxLength(50)
  nombre: string;

  @IsOptional()
  @IsString()
  @MaxLength(15)
  cue?: string; // Clave Única de Establecimiento

  @IsString()
  @IsNotEmpty({ message: 'La dirección es obligatoria' })
  @MaxLength(50)
  direccion: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  telefono?: string;

  @IsOptional()
  @IsEmail({}, { message: 'El formato del correo electrónico no es válido' })
  @MaxLength(50)
  email?: string;

  @IsString()
  @IsNotEmpty({ message: 'El tipo de gestión es obligatorio' })
  @IsIn(['PUBLICA', 'PRIVADA'], { message: 'El tipo de gestión debe ser PUBLICA o PRIVADA' })
  tipo_gestion: string;
}
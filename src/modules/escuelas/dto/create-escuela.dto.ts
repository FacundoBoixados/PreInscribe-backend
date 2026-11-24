import {
  IsEmail,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateEscuelaDto {
  @IsInt()
  @IsNotEmpty({ message: 'El ID de la localidad es obligatorio' })
  localidadId: number;

  @IsString()
  @IsNotEmpty({ message: 'El nombre de la escuela es obligatorio' })
  @MaxLength(150)
  nombre: string;

  @IsOptional()
  @IsString()
  @MaxLength(15)
  cue?: string; // Clave Única de Establecimiento

  @IsString()
  @IsNotEmpty({ message: 'La dirección es obligatoria' })
  @MaxLength(200)
  direccion: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  telefono?: string;

  @IsOptional()
  @IsEmail({}, { message: 'El formato del correo electrónico no es válido' })
  @MaxLength(150)
  email?: string;

  @IsString()
  @IsNotEmpty({ message: 'El tipo de gestión es obligatorio' })
  @IsIn(['PUBLICA', 'PRIVADA'], {
    message: 'El tipo de gestión debe ser PUBLICA o PRIVADA',
  })
  tipoGestion: string;
}
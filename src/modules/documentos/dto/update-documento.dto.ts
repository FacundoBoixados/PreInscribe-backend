import { PartialType } from '@nestjs/mapped-types';
import { CreateDocumentoDto } from './create-documento.dto.js';

export class UpdateDocumentoDto extends PartialType(CreateDocumentoDto) {}

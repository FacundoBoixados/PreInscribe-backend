
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';
import { CreateDocumentoDto } from './dto/create-documento.dto.js';
import { UpdateDocumentoDto } from './dto/update-documento.dto.js';

@Injectable()
export class DocumentosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDocumentoDto: CreateDocumentoDto) {
    await this.validateDocumentoUnico(
      createDocumentoDto.preinscripcionId,
      createDocumentoDto.tipoDocumentoId,
    );

    return this.prisma.documento.create({
      data: {
        nombre_archivo: createDocumentoDto.nombreArchivo,
        ruta_archivo: createDocumentoDto.rutaArchivo,
        mime_type: createDocumentoDto.mimeType,
        tamano_bytes: createDocumentoDto.tamanoBytes,
        preinscripcion_id: createDocumentoDto.preinscripcionId,
        tipo_documento_id: createDocumentoDto.tipoDocumentoId,
      },
    });
  }

  findAll() {
    return this.prisma.documento.findMany();
  }

  async findOne(id: number) {
    const documento = await this.prisma.documento.findUnique({
      where: { id },
    });

    if (!documento) {
      throw new NotFoundException(
        `No existe un documento con id ${id}.`,
      );
    }

    return documento;
  }

  async update(id: number, updateDocumentoDto: UpdateDocumentoDto) {
    const actual = await this.findOne(id);

    const preinscripcionId =
      updateDocumentoDto.preinscripcionId ?? actual.preinscripcion_id;

    const tipoDocumentoId =
      updateDocumentoDto.tipoDocumentoId ?? actual.tipo_documento_id;

    if (
      updateDocumentoDto.preinscripcionId !== undefined ||
      updateDocumentoDto.tipoDocumentoId !== undefined
    ) {
      await this.validateDocumentoUnico(
        preinscripcionId,
        tipoDocumentoId,
        id,
      );
    }

    return this.prisma.documento.update({
      where: { id },
      data: {
        ...(updateDocumentoDto.nombreArchivo !== undefined && {
          nombre_archivo: updateDocumentoDto.nombreArchivo,
        }),
        ...(updateDocumentoDto.rutaArchivo !== undefined && {
          ruta_archivo: updateDocumentoDto.rutaArchivo,
        }),
        ...(updateDocumentoDto.mimeType !== undefined && {
          mime_type: updateDocumentoDto.mimeType,
        }),
        ...(updateDocumentoDto.tamanoBytes !== undefined && {
          tamano_bytes: updateDocumentoDto.tamanoBytes,
        }),
        ...(updateDocumentoDto.preinscripcionId !== undefined && {
          preinscripcion_id: updateDocumentoDto.preinscripcionId,
        }),
        ...(updateDocumentoDto.tipoDocumentoId !== undefined && {
          tipo_documento_id: updateDocumentoDto.tipoDocumentoId,
        }),
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.documento.delete({
      where: { id },
    });
  }

  private async validateDocumentoUnico(
    preinscripcionId: number,
    tipoDocumentoId: number,
    documentoId?: number,
  ) {
    const existente = await this.prisma.documento.findFirst({
      where: {
        preinscripcion_id: preinscripcionId,
        tipo_documento_id: tipoDocumentoId,
      },
      select: { id: true },
    });

    if (existente && existente.id !== documentoId) {
      throw new ConflictException(
        'La preinscripción ya tiene un documento de ese tipo.',
      );
    }
  }
}

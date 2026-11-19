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

    return this.prisma.documento.create({ data: createDocumentoDto });
  }

  findAll() {
    return this.prisma.documento.findMany();
  }

  async findOne(id: number) {
    const documento = await this.prisma.documento.findUnique({ where: { id } });

    if (!documento) {
      throw new NotFoundException(`No existe un documento con id ${id}.`);
    }

    return documento;
  }

  async update(id: number, updateDocumentoDto: UpdateDocumentoDto) {
    const actual = await this.findOne(id);

    if (updateDocumentoDto.preinscripcionId || updateDocumentoDto.tipoDocumentoId) {
      await this.validateDocumentoUnico(
        updateDocumentoDto.preinscripcionId ?? actual.preinscripcionId,
        updateDocumentoDto.tipoDocumentoId ?? actual.tipoDocumentoId,
        id,
      );
    }

    return this.prisma.documento.update({
      where: { id },
      data: updateDocumentoDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.documento.delete({ where: { id } });
  }

  private async validateDocumentoUnico(
    preinscripcionId: number,
    tipoDocumentoId: number,
    documentoId?: number,
  ) {
    const existente = await this.prisma.documento.findFirst({
      where: { preinscripcionId, tipoDocumentoId },
      select: { id: true },
    });

    if (existente && existente.id !== documentoId) {
      throw new ConflictException(
        'La preinscripción ya tiene un documento de ese tipo.',
      );
    }
  }
}
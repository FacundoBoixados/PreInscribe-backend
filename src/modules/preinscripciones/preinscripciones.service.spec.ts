import { Test, TestingModule } from '@nestjs/testing';
import { PreinscripcionesService } from './preinscripciones.service.js';

describe('PreinscripcionesService', () => {
  let service: PreinscripcionesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PreinscripcionesService],
    }).compile();

    service = module.get<PreinscripcionesService>(PreinscripcionesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

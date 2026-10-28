import { Test, TestingModule } from '@nestjs/testing';
import { NivelesGradosService } from './niveles-grados.service.js';

describe('NivelesGradosService', () => {
  let service: NivelesGradosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NivelesGradosService],
    }).compile();

    service = module.get<NivelesGradosService>(NivelesGradosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

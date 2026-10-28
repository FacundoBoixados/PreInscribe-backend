import { Test, TestingModule } from '@nestjs/testing';
import { VacantesService } from './vacantes.service.js';

describe('VacantesService', () => {
  let service: VacantesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VacantesService],
    }).compile();

    service = module.get<VacantesService>(VacantesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

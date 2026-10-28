import { Test, TestingModule } from '@nestjs/testing';
import { EscuelasService } from './escuelas.service.js';

describe('EscuelasService', () => {
  let service: EscuelasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EscuelasService],
    }).compile();

    service = module.get<EscuelasService>(EscuelasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

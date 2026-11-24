import { Test, TestingModule } from '@nestjs/testing';
import { VacantesController } from './vacantes.controller.js';
import { VacantesService } from './vacantes.service.js';

describe('VacantesController', () => {
  let controller: VacantesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VacantesController],
      providers: [VacantesService],
    }).compile();

    controller = module.get<VacantesController>(VacantesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

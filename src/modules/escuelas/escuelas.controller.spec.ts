import { Test, TestingModule } from '@nestjs/testing';
import { EscuelasController } from './escuelas.controller.js';
import { EscuelasService } from './escuelas.service.js';

describe('EscuelasController', () => {
  let controller: EscuelasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EscuelasController],
      providers: [EscuelasService],
    }).compile();

    controller = module.get<EscuelasController>(EscuelasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

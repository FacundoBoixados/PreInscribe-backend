import { Test, TestingModule } from '@nestjs/testing';
import { NivelesGradosController } from './niveles-grados.controller.js';
import { NivelesGradosService } from './niveles-grados.service.js';

describe('NivelesGradosController', () => {
  let controller: NivelesGradosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NivelesGradosController],
      providers: [NivelesGradosService],
    }).compile();

    controller = module.get<NivelesGradosController>(NivelesGradosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

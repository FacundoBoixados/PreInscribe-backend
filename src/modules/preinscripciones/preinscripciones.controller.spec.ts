import { Test, TestingModule } from '@nestjs/testing';
import { PreinscripcionesController } from './preinscripciones.controller.js';
import { PreinscripcionesService } from './preinscripciones.service.js';

describe('PreinscripcionesController', () => {
  let controller: PreinscripcionesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PreinscripcionesController],
      providers: [PreinscripcionesService],
    }).compile();

    controller = module.get<PreinscripcionesController>(PreinscripcionesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

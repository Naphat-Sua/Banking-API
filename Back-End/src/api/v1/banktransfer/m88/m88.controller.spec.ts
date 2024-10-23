import { Test, TestingModule } from '@nestjs/testing';
import { M88Controller } from './m88.controller';

describe('M88Controller', () => {
  let controller: M88Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [M88Controller],
    }).compile();

    controller = module.get<M88Controller>(M88Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

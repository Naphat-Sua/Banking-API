import { Test, TestingModule } from '@nestjs/testing';
import { HuayController } from './huay.controller';

describe('HuayController', () => {
  let controller: HuayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HuayController],
    }).compile();

    controller = module.get<HuayController>(HuayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

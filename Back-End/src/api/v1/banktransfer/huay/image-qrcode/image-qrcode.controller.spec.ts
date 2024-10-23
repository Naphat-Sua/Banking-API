import { Test, TestingModule } from '@nestjs/testing';
import { ImageQrcodeController } from './image-qrcode.controller';

describe('ImageQrcodeController', () => {
  let controller: ImageQrcodeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImageQrcodeController],
    }).compile();

    controller = module.get<ImageQrcodeController>(ImageQrcodeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

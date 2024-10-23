import { Test, TestingModule } from '@nestjs/testing';
import { HuayService } from './huay.service';

describe('HuayService', () => {
  let service: HuayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HuayService],
    }).compile();

    service = module.get<HuayService>(HuayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

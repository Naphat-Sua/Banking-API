import { Test, TestingModule } from '@nestjs/testing';
import { CovertMessageAutoService } from './covert-message-auto.service';

describe('CovertMessageAutoService', () => {
  let service: CovertMessageAutoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CovertMessageAutoService],
    }).compile();

    service = module.get<CovertMessageAutoService>(CovertMessageAutoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { M88Service } from './m88.service';

describe('M88Service', () => {
  let service: M88Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [M88Service],
    }).compile();

    service = module.get<M88Service>(M88Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

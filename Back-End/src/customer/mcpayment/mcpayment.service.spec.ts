import { Test, TestingModule } from '@nestjs/testing';
import { McpaymentService } from './mcpayment.service';

describe('McpaymentService', () => {
  let service: McpaymentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [McpaymentService],
    }).compile();

    service = module.get<McpaymentService>(McpaymentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

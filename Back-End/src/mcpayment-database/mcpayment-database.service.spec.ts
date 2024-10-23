import { Test, TestingModule } from '@nestjs/testing';
import { McpaymentDatabaseService } from './mcpayment-database.service';

describe('McpaymentDatabaseService', () => {
  let service: McpaymentDatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [McpaymentDatabaseService],
    }).compile();

    service = module.get<McpaymentDatabaseService>(McpaymentDatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

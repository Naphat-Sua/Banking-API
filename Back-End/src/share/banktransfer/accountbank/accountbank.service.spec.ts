import { Test, TestingModule } from '@nestjs/testing';
import { AccountbankService } from './accountbank.service';

describe('AccountbankService', () => {
  let service: AccountbankService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountbankService],
    }).compile();

    service = module.get<AccountbankService>(AccountbankService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { RequestMoneyService } from './request-money.service';

describe('RequestMoneyService', () => {
  let service: RequestMoneyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequestMoneyService],
    }).compile();

    service = module.get<RequestMoneyService>(RequestMoneyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

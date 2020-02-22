import { Test, TestingModule } from '@nestjs/testing';
import { SignsService } from './signs.service';

describe('SignsService', () => {
  let service: SignsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SignsService],
    }).compile();

    service = module.get<SignsService>(SignsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

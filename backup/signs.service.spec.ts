import { Test, TestingModule } from '@nestjs/testing';
import { SignsService } from '../src/signs/signs.service';

describe('SignsService', () => {
  let service: SignsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SignsService],
    }).compile();

    service = module.get<SignsService>(SignsService);
  });

  it('mock test', () => {
    // expect(service).toBeDefined();
    const mockFn = jest.fn();
    let res = mockFn();
    console.log(res);
  });
});

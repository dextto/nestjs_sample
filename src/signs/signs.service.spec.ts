import { Test, TestingModule } from '@nestjs/testing';
import { SignsService } from './signs.service';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { Sign } from './sign.entity';
import { UserRole, User } from '../users/user.entity';

export const mockSign = jest.fn(() => ({
  find: () =>
    new Promise((resolve, reject) => {
      resolve([{
        id: 1,
        url: 'http://test.com/1.png',
        user: { id: 1, name: 'test name', role: UserRole.USER }
      }]);
    }),
  save: () =>
    new Promise((resolve, reject) => {
      resolve({
        id: 1,
        url: 'http://test.com/1.png',
        user: { id: 1, name: 'test name', role: UserRole.USER }
      });
    })
}));

export const mockUser = jest.fn(() => ({
  findOne: () =>
    new Promise((resolve, reject) => {
      resolve([{ id: 1, name: 'test name', role: UserRole.USER }]);
    }),
}));

describe('SignsService', () => {
  let service: SignsService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([Sign, User])],
      providers: [SignsService,
        {
          provide: getRepositoryToken(Sign),
          useClass: mockSign,
        },
        {
          provide: getRepositoryToken(User),
          useClass: mockUser,
        },
      ],
    }).compile();

    service = module.get<SignsService>(SignsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  test('can find all signs', async (done) => {
    const signsFromDb: Sign[] = await service.find(1);
    expect(Array.isArray(signsFromDb)).toBeTruthy();
    expect(signsFromDb[0].id).toBe(1);
    expect(signsFromDb[0].url).toBe('http://test.com/1.png');
    expect(signsFromDb[0].user).toEqual({ "id": 1, "name": "test name", "role": "user" });
    done();
  });

  test('can create a sign', async (done) => {
    const sign = await service.create(1, { url: 'http://test.com/1.png' })
    expect(sign.id).toEqual(1);
    expect(sign.url).toBe('http://test.com/1.png');
    expect(sign.user).toEqual({ "id": 1, "name": "test name", "role": "user" });
    done();
  })
});

import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { User, UserRole } from './user.entity';

export const mockRepository = jest.fn(() => ({
  find: () =>
    new Promise((resolve, reject) => {
      resolve([{ id: 1, name: 'test name', role: UserRole.USER }]);
    }),
}));

describe('UsersService', () => {
  let service: UsersService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([User])],
      providers: [UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('can find all users', async () => {
    const usersFromDb: User[] = await service.findAll();
    console.log(usersFromDb);

    expect(Array.isArray(usersFromDb)).toBeTruthy();
    expect(usersFromDb[0].id).toBe(1);
    expect(usersFromDb[0].name).toBe('test name');
  });
});

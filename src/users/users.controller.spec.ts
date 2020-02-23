import { Test } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserRole, User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

const mockUser = jest.fn().mockResolvedValue({
  id: 1,
  name: 'test name',
  role: UserRole.USER
})

describe('User Controller', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            createUser: mockUser
          }
        }
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('can find all users', async () => {
    const payload = new CreateUserDto();
    payload.name = 'test name';
    payload.role = UserRole.USER;
    const userFromDb = await controller.createUser(payload);

    expect(userFromDb).toBeTruthy();
    expect(userFromDb.id).toBe(1);
    expect(userFromDb.name).toBe('test name');
    expect(userFromDb.role).toBe(UserRole.USER);
  });
});

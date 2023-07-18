import { Test } from '@nestjs/testing';
import { mockDeep } from 'jest-mock-extended';
import { AuthzModule } from '../authz/authz.module';
import { UserDto } from './dto';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { userStub } from './__mocks__/user';

describe('User', () => {
  let userService: UserService;
  let userController: UserController;

  const userId: UserDto = { userId: userStub().id };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AuthzModule],
      providers: [
        {
          provide: UserService,
          useValue: mockDeep<UserService>(),
        },
      ],
      controllers: [UserController],
    }).compile();

    userService = moduleRef.get(UserService);
    userController = moduleRef.get<UserController>(UserController);
  });

  describe('Get an user', () => {
    test('It should call getUserById in service', async () => {
      await userController.getUser(userId);
      expect(userService.getUserById).toHaveBeenCalledTimes(1);
    });
    test('It should have returned the found user', async () => {
      userService.getUserById = jest.fn().mockResolvedValue({
        data: userStub(),
      });
      const { data } = await userController.getUser(userId);
      expect(data).toMatchObject(userStub());
    });
  });

  describe('Delete a user', () => {
    test('It should call deleteUserByUserId in service', async () => {
      await userController.deleteUserByUserId(userId);
      expect(userService.deleteUserByUserId).toHaveBeenCalled();
    });
    test('It should have returned the deleted user', async () => {
      userService.deleteUserByUserId = jest.fn().mockResolvedValue({
        data: userStub(),
      });
      const { data } = await userController.deleteUserByUserId(userId);
      expect(data).toMatchObject(userStub());
    });
  });
});

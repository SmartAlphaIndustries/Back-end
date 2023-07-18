import { Test, TestingModule } from '@nestjs/testing';
import { mockDeep } from 'jest-mock-extended';
import { ORMService } from '../orm/orm.service';
import { AuthzController } from './authz.controller';
import { AuthzModule } from './authz.module';
import { AuthzService } from './authz.service';
import { signupStub } from './__mocks__/signup';

describe('AuthzController', () => {
  let controller: AuthzController;
  let service: AuthzService;
  let ormService: ORMService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AuthzModule],
      providers: [
        {
          provide: AuthzService,
          useValue: mockDeep<AuthzService>(),
        },
        {
          provide: ORMService,
          useValue: mockDeep<ORMService>(),
        },
      ],
      controllers: [AuthzController],
    }).compile();

    controller = moduleRef.get<AuthzController>(AuthzController);
    service = moduleRef.get<AuthzService>(AuthzService);
    ormService = moduleRef.get(ORMService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('Create user', () => {
    describe('when signup is called in auth controller', () => {
      test('Then it must return the user object that was created', async () => {
        service.signup = jest.fn().mockResolvedValue({ data: signupStub() });
        const { data } = await controller.signup(signupStub());
        expect(data).toMatchObject(signupStub());
      });
    });
  });
});

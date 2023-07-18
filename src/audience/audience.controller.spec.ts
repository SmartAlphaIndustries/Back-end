import { Test } from '@nestjs/testing';
import { mockDeep } from 'jest-mock-extended';
import { AudienceService } from './audience.service';
import { AudienceController } from './audience.controller';
import {
  addOrDeleteUserStub,
  audiencePayload,
  audienceStub,
} from './__mocks__/audience';
import { ORMModule } from '../orm/orm.module';
import { ORMService } from '../orm/orm.service';
import { ConfigService } from '@nestjs/config';

describe('AudienceController', () => {
  let audienceService: AudienceService;
  let audienceController: AudienceController;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ORMModule],
      providers: [
        {
          provide: ORMService,
          useValue: mockDeep<ORMService>(),
        },
        {
          provide: AudienceService,
          useValue: mockDeep<AudienceService>(),
        },
        {
          provide: ConfigService,
          useValue: mockDeep<ConfigService>(),
        },
      ],
      controllers: [AudienceController],
    }).compile();

    audienceController = moduleRef.get<AudienceController>(AudienceController);
    audienceService = moduleRef.get<AudienceService>(AudienceService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('Create Audience', () => {
    describe('when createAudience is called in audience controller', () => {
      test('Then createAudience is called in audience service', async () => {
        await audienceController.createAudience(audienceStub());
        expect(audienceService.createAudience).toHaveBeenCalledWith(
          audienceStub(),
        );
      });

      test('Then it must return the audience object that was created', async () => {
        audienceService.createAudience = jest
          .fn()
          .mockResolvedValue({ data: audienceStub() });
        const { data } = await audienceController.createAudience(
          audienceStub(),
        );
        expect(data).toMatchObject(audienceStub());
      });
    });
  });

  describe('Add an user in a group', () => {
    test('It must call addUser in service', async () => {
      await audienceController.addUser(addOrDeleteUserStub());
      expect(audienceService.addUser).toHaveBeenCalledTimes(1);
    });
    test('It must return the new group with the added user', async () => {
      audienceService.addUser = jest.fn().mockResolvedValue({
        data: audiencePayload().group,
      });
    });
  });

  describe('Delete an user from a group', () => {
    test('It must call deleteUser in service', async () => {
      await audienceController.deleteUser(addOrDeleteUserStub());
      expect(audienceService.deleteUser).toHaveBeenCalledTimes(1);
    });
    test('It must return the new group without the deleted user', async () => {
      audienceService.deleteUser = jest.fn().mockResolvedValue({
        data: audiencePayload().group,
      });
    });
  });

  describe('Delete an audience', () => {
    test('It must call deleteAudience in service', async () => {
      await audienceController.deleteAudience(addOrDeleteUserStub());
      expect(audienceService.deleteAudience).toHaveBeenCalledTimes(1);
    });
    test('It must return the deleted id group', async () => {
      audienceService.deleteAudience = jest.fn().mockResolvedValue({
        data: audiencePayload().id,
      });
    });
  });
});

import { Audience } from '@prisma/client';
import {
  CreateAudienceDto,
  AddOrDeleteUserDto,
  DeleteAudienceDto,
} from '../dto';

export const audienceStub = (): CreateAudienceDto => ({
  title: 'Title',
  group: [],
});

export const audiencePayload = (): Audience => ({
  id: '6357ce11fb82be0bc5066019',
  createdAt: new Date('2022-12-01T05:11:58.841Z'),
  updatedAt: new Date('2022-12-01T05:11:58.841Z'),
  title: 'Title',
  group: [],
});

export const addOrDeleteUserStub = (): AddOrDeleteUserDto => ({
  audienceId: '6357ce11fb82be0bc5066019',
  userId: '63880c5ff4caf7e9ad72164a',
});

export const deleteAudienceStub = (): DeleteAudienceDto => ({
  audienceId: '6357ce11fb82be0bc5066019',
});

export const addOrDeleteResponseStub = (): Partial<Audience> => ({
  group: [],
});

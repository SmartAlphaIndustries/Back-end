import { User } from '@prisma/client';
import { UserDto } from '../dto';

//TODO: User type schema
export const userStub = (): any => ({
  id: '630eeb6514dd9b6a47da0130',
  createdAt: new Date('2022-08-31T05:02:29.722Z'),
  updatedAt: new Date('2022-08-31T05:02:29.722Z'),
  username: 'Pikashaman',
  password: 'SmartAlphaIsGod',
  /* acceptances: ['630eeb6514dd9b6a47da0130', '630eeb6514dd9b6a47da0130'], */
  userPersonalInfo: '630eeb6514dd9b6a47da0130',
  jiraAccess: true,
  jobs: ['630eeb6514dd9b6a47da0130', '630eeb6514dd9b6a47da0130'],
});

export const userGetOrDeleteStub = (): Partial<User> => ({
  id: '630eeb6514dd9b6a47da0130',
});

export const userDtoStub = (): UserDto => ({
  userId: '638c544c6b570716cad734b9',
});

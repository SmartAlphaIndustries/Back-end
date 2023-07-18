import { User } from '@prisma/client';
import { UserDto } from '../dto';

export const userStub = (): User => ({
  id: '630eeb6514dd9b6a47da0130',
  createdAt: new Date('2022-08-31T05:02:29.722Z'),
  updatedAt: new Date('2022-08-31T05:02:29.722Z'),
  bookmarkedAuthor: [],
});

export const userGetOrDeleteStub = (): Partial<User> => ({
  id: '630eeb6514dd9b6a47da0130',
});

export const userDtoStub = (): UserDto => ({
  userId: '638c544c6b570716cad734b9',
});
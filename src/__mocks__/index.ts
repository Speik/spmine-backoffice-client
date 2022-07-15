import { v4 as uuidv4 } from 'uuid';

import { IUser } from '../interfaces';
import { getRandomNumber } from '../utils/helpers';

const MOCK_USERNAMES = [
  'Unnamed',
  'Mary',
  'Unknown',
  'James',
  'John',
  'Nameless',
  'Tester',
];

const getMockUser = (): IUser => ({
  id: uuidv4(),
  username: MOCK_USERNAMES[getRandomNumber(0, MOCK_USERNAMES.length - 1)],
  createdAt: new Date().toLocaleString(),
  updatedAt: new Date().toLocaleString(),
});

const getMockUsersList = (count: number): IUser[] => {
  return new Array(count).fill(null).map(() => getMockUser());
};

export { getMockUser, getMockUsersList };

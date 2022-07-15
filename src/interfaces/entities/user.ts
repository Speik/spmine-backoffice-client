import { AnyValue } from '..';

interface IUser {
  id: string;
  username: string;
  password?: string;
  createdAt: string;
  updatedAt: string;
  [key: string]: AnyValue;
}

export { IUser };

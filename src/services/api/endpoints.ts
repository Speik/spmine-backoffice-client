import { delay, getRandomNumber } from '../../utils/helpers';
import { getMockUser, getMockUsersList } from '../../__mocks__';

const fetchUser = async () => {
  await delay(1000);

  return getMockUser();
};

const fetchUsersList = async () => {
  const usersCount = getRandomNumber(4, 32);
  await delay(1000);

  return getMockUsersList(usersCount);
};

export { fetchUser, fetchUsersList };

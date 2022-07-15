import { createAction } from '@reduxjs/toolkit';
import { IUser } from '../../interfaces';

enum UsersListActionTypes {
  SET_USERS_LIST = 'usersList/setUsersList',
  CREATE_USER = 'usersList/createUser',
  EDIT_USER = 'usersList/editUser',
  DELETE_USER = 'usersList/deleteUser',
}

const setUsersList = createAction(
  UsersListActionTypes.SET_USERS_LIST,
  (usersList: IUser[]) => ({
    payload: usersList,
  }),
);

const createUser = createAction(
  UsersListActionTypes.CREATE_USER,
  (user: IUser) => ({
    payload: user,
  }),
);

const editUser = createAction(
  UsersListActionTypes.EDIT_USER,
  (id: string, user: Partial<IUser>) => ({
    payload: { id, user },
  }),
);

const deleteUser = createAction(
  UsersListActionTypes.DELETE_USER,
  (id: string) => ({
    payload: id,
  }),
);

export { setUsersList, createUser, editUser, deleteUser, UsersListActionTypes };

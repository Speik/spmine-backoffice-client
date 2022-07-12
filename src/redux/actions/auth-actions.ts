import { createAction } from '@reduxjs/toolkit';
import { IUser } from '../../interfaces';

enum AuthActionTypes {
  SET_USER_LOGGED_IN = 'auth/setUserLoggedIn',
  SET_USER_LOGGED_OUT = 'auth/setUserLoggedOut',
  SET_USER = 'auth/setUser',
}

const setUserLoggedIn = createAction(AuthActionTypes.SET_USER_LOGGED_IN);
const setUserLoggedOut = createAction(AuthActionTypes.SET_USER_LOGGED_OUT);
const setUser = createAction(AuthActionTypes.SET_USER, (user: IUser) => ({
  payload: user,
}));

export { setUserLoggedIn, setUserLoggedOut, setUser, AuthActionTypes };

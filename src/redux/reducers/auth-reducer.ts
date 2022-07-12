import { createReducer } from '@reduxjs/toolkit';

import { IUser } from '../../interfaces';
import { isUserLoggedIn } from '../../utils/helpers';

import {
  setUserLoggedIn,
  setUserLoggedOut,
  setUser,
} from '../actions/auth-actions';

interface IAuthState {
  isLoggedIn: boolean;
  user: IUser;
}

const initialState: IAuthState = {
  isLoggedIn: isUserLoggedIn(),
  user: {},
};

const AuthReducer = createReducer(initialState, (builder) => {
  builder.addCase(setUserLoggedIn, (state) => {
    return { ...state, isLoggedIn: true };
  });

  builder.addCase(setUserLoggedOut, (state) => {
    return { ...state, isLoggedIn: false };
  });

  builder.addCase(setUser, (state, action) => {
    return { ...state, user: action.payload };
  });

  builder.addDefaultCase((state) => state);
});

export { AuthReducer };

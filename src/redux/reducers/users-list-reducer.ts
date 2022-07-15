import { createReducer } from '@reduxjs/toolkit';

import { IUser } from '../../interfaces';
import {
  setUsersList,
  createUser,
  editUser,
  deleteUser,
} from '../actions/users-list-actions';

interface IUsersListState {
  data: IUser[];
}

const initialState: IUsersListState = {
  data: [],
};

const UsersListReducer = createReducer(initialState, (builder) => {
  builder.addCase(setUsersList, (state, action) => {
    return { ...state, data: action.payload };
  });

  builder.addCase(createUser, (state, action) => {
    return { ...state, data: [...state.data, action.payload] };
  });

  builder.addCase(editUser, (state, action) => {
    const newData = [...state.data];

    const targetUser = state.data.find((user) => {
      return user.id === action.payload.id;
    });

    if (!targetUser) {
      return state;
    }

    const targetUserIndex = state.data.indexOf(targetUser);
    const updatedUser = { ...targetUser, ...action.payload.user };

    newData.splice(targetUserIndex, 1, updatedUser);
    return { ...state, data: newData };
  });

  builder.addCase(deleteUser, (state, action) => {
    return {
      ...state,
      data: state.data.filter((user) => user.id !== action.payload),
    };
  });

  builder.addDefaultCase((state) => state);
});

export { UsersListReducer };

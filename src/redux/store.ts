import { configureStore } from '@reduxjs/toolkit';
import { AuthReducer } from './reducers/auth-reducer';

const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    auth: AuthReducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export { store, RootState, AppDispatch };

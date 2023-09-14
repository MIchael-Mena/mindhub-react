import { configureStore } from '@reduxjs/toolkit';
import citiesReducer from './reducers/cities';
import userReducer from './reducers/user';

export const store = configureStore({
  reducer: {
    citiesReducer: citiesReducer,
    userReducer: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

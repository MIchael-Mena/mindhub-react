import { configureStore } from '@reduxjs/toolkit';
import citiesReducer from './reducers/cities';

export const store = configureStore({
  reducer: {
    citiesReducer: citiesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
import { configureStore } from '@reduxjs/toolkit';
import citiesReducer from './reducers/cities';
import userReducer from './reducers/user';
import { citySelectedReducer } from './reducers/city-selected';
import activeItineraryReducer from './slices/active-itinerary';
import itineraryExtraReducer from './slices/itinerary-extra';

export const store = configureStore({
  reducer: {
    citiesReducer: citiesReducer,
    citySelectedReducer: citySelectedReducer,
    userReducer: userReducer,
    activeItineraryReducer: activeItineraryReducer, // No se usa, pero se deja como ejemplo
    itineraryExtraReducer: itineraryExtraReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { createReducer } from '@reduxjs/toolkit';
import { City } from '../../models/City';
import { getCities } from '../actions/cities';

const initialState = {
  // cities: [] as City[],
  loading: false,
  error: null,
  cities: [
    {
      _id: '1',
      name: 'London',
      country: 'United Kingdom',
      description:
        'London is the capital and largest city of England and the United Kingdom. Standing on the River Thames in the south-east of England, at the head of its 50-mile (80 km) estuary leading to the North Sea, London has been a major settlement for two millennia.',
      images: [],
      area: 1572,
      bestTime: 'May, June, July',
      currency: 'GBP',
      language: 'English',
      population: 8900000,
      timezone: 'UTC+0',
      capital: true,
      rating: 4.5,
      religion: 'Christianity',
    },
  ] as City[],
};

const citiesReducer = createReducer(initialState, (builder) => {
  builder.addCase(getCities, (state, action) => {
    state.cities = action.payload.cities;
  });
});

export default citiesReducer;

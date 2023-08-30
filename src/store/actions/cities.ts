import { createAction } from '@reduxjs/toolkit';
import { City } from '../../models/City';

const getCities = createAction('getCities', (payload: { cities: City[] }) => ({
  payload,
}));

export { getCities };

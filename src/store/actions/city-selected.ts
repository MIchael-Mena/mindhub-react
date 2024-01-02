import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { City } from '../../models/City';
import { ApiService } from '../../services/api.service';

const updateCitySelected = createAction<City>('updateCitySelected'); // Devuelve un objeto con type y payload

const fetchCitySelectedById = createAsyncThunk(
  'fetchCitySelectedById',
  async (payload: { id: string }) => {
    try {
      const city = await ApiService.getData<City>(`/city/${payload.id}`);
      return { city };
    } catch (error) {
      throw error;
    }
  }
);

export { updateCitySelected, fetchCitySelectedById };

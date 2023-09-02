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

const fetchCities = createAsyncThunk(
  'fetchCities',
  async (payload: { search?: string }) => {
    try {
      const cities = await ApiService.getData<City[]>('/city', payload);
      return { cities };
    } catch (error) {
      throw error;
    }
  }
);

const fetchPopularCities = createAsyncThunk(
  'fetchPopularCities',
  async (payload: { limit: number }) => {
    try {
      const cities = await ApiService.getData<City[]>('/city', {
        limit: payload.limit,
        sort: 'rating',
        order: 'desc',
      });
      return { cities };
    } catch (error) {
      throw error;
    }
  }
);

export {
  fetchCities,
  fetchPopularCities,
  updateCitySelected,
  fetchCitySelectedById,
};

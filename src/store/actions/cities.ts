import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { CityBasic } from '../../models/CityBasic';
import { ApiService } from '../../services/api.service';
import { City } from '../../models/City';

interface CityGetResponse {
  cities: CityBasic[];
  totalPages: number;
}

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
  async (payload: { [key: string]: string | number | boolean } = {}, api) => {
    try {
      // Opcion para poder acceder a un estado previo
      // console.log(
      //   'state',
      //   (api.getState() as RootState).citiesReducer.cities.hasBeenModified
      // );
      const cityGetResponse = await ApiService.getData<CityGetResponse>(
        '/city',
        {
          // populate_itineraries: true,
          basic_info: true,
          ...payload,
        }
      );
      return cityGetResponse;
    } catch (error) {
      throw error;
    }
  }
);

const fetchPopularCities = createAsyncThunk(
  'fetchPopularCities',
  async (payload: { limit: number }) => {
    try {
      const { cities } = await ApiService.getData<CityGetResponse>('/city', {
        limit: payload.limit,
        sort: 'rating',
        order: 'desc',
        // populate_itineraries: true,
        basic_info: true,
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

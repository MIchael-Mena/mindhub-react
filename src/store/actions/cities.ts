import { createAsyncThunk } from '@reduxjs/toolkit';
import { CityBasic } from '../../models/CityBasic';
import { ApiService } from '../../services/api.service';

interface CityGetResponse {
  cities: CityBasic[];
  totalPages: number;
}

const fetchCities = createAsyncThunk(
  'fetchCities',
  async (payload: { search?: string; page: number }, api) => {
    try {
      // Opcion para poder acceder a un estado desde un action, tambien se puede desestructurar el objeto api
      // console.log(
      //   'state',
      //   (api.getState() as RootState).citiesReducer.cities.hasBeenModified
      // );
      const cityGetResponse = await ApiService.getData<CityGetResponse>(
        '/city',
        {
          // populate_itineraries: true,
          basic_info: true, // Evito traer algunos campos que no necesito como la fecha de creacion, etc
          ...payload,
        }
      );
      const currentSearch = payload.search ? payload.search : '';

      return { currentSearch: currentSearch, ...cityGetResponse };
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

export { fetchCities, fetchPopularCities };

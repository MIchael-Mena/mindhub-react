import { createAsyncThunk } from '@reduxjs/toolkit';
import { CityBasic } from '../../models/CityBasic';
import { ApiService } from '../../services/api.service';
import { PaginationData } from '../../models/PaginationData';
import { CitySearchParams } from '../../modules/cities/models/CitySearchParams';

interface CityGetResponse extends PaginationData {
  cities: CityBasic[];
}

const fetchCities = createAsyncThunk(
  'fetchCities',
  async (payload: CitySearchParams) => {
    try {
      const { search, page, sort } = payload;
      const cityGetResponse = await ApiService.getData<CityGetResponse>(
        '/city',
        {
          // populate_itineraries: true,
          basic_info: true, // Evito traer algunos campos que no necesito como la fecha de creacion, etc
          limit: 9,
          ...payload,
        }
      );
      const { cities, ...paramsRes } = cityGetResponse;
      const params = { search, page, sort, ...paramsRes };

      return { cities, params };
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

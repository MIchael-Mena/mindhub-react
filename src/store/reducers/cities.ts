import { createReducer } from '@reduxjs/toolkit';
import { CityBasic } from '../../models/CityBasic';
import { fetchCities, fetchPopularCities } from '../actions/cities';
import { StatusResponse } from '../../models/StatusResponse';
import { CitySearchParams } from '../../modules/cities/models/CitySearchParams';
import { CityPaginationData } from '../../modules/cities/models/CityPaginationData';

type GloblaState = {
  hasBeenModified: boolean; // Si la data ha sido modificada al menos una vez
};

const citiesState: {
  citiesFiltered: StatusResponse<CityBasic[]> &
    GloblaState & { params: CitySearchParams & CityPaginationData };
  popularCities: StatusResponse<CityBasic[]> & GloblaState;
} = {
  popularCities: {
    loading: true,
    error: null,
    data: [],
    hasBeenModified: false,
  },
  citiesFiltered: {
    params: {
      search: '',
      sort: 'createdAt',
      page: 0,
      totalPages: 0,
      foundCitiesCount: 0,
    },
    loading: true,
    error: null,
    data: [],
    hasBeenModified: false,
  },
};

const citiesReducer = createReducer(citiesState, (builder) => {
  builder
    .addCase(fetchCities.pending, (state) => {
      state.citiesFiltered.loading = true;
    })
    .addCase(fetchCities.fulfilled, (state, action) => {
      state.citiesFiltered.params = {
        ...state.citiesFiltered.params,
        ...action.payload.params,
      };

      state.citiesFiltered.data = action.payload.cities;
      state.citiesFiltered.hasBeenModified = true;
      state.citiesFiltered.loading = false;
    })
    .addCase(fetchCities.rejected, (state, action) => {
      state.citiesFiltered.params.search = '';
      state.citiesFiltered.params.sort = 'createdAt';
      state.citiesFiltered.params.page = 0;
      state.citiesFiltered.params.totalPages = 0;
      state.citiesFiltered.params.foundCitiesCount = 0;

      state.citiesFiltered.loading = false;
      state.citiesFiltered.error = action.error;
    })

    .addCase(fetchPopularCities.pending, (state) => {
      state.popularCities.loading = true;
    })
    .addCase(fetchPopularCities.fulfilled, (state, action) => {
      state.popularCities.loading = false;
      state.popularCities.data = action.payload.cities;
      state.popularCities.hasBeenModified = true;
    })
    .addCase(fetchPopularCities.rejected, (state, action) => {
      state.popularCities.loading = false;
      state.popularCities.error = action.error;
    });
});

export default citiesReducer;

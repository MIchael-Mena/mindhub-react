import { SerializedError, createReducer } from '@reduxjs/toolkit';
import { CityBasic } from '../../models/CityBasic';
import { fetchCities, fetchPopularCities } from '../actions/cities';
import { StatusResponse } from '../../models/StatusResponse';
import { CitySearchParams } from '../../modules/cities/models/CitySearchParams';
import { PaginationData } from '../../models/PaginationData';
import { CITIES_DEFAULT_SORT_OPTION } from '../../modules/cities/util/sort-options';

const citiesState: {
  citiesFiltered: StatusResponse<CityBasic[], SerializedError> & {
    params: CitySearchParams & PaginationData;
  };
  popularCities: StatusResponse<CityBasic[], SerializedError>;
  carousel: {
    currentSlide: number;
    lastSlide: number;
  };
} = {
  popularCities: {
    loading: true,
    error: null,
    data: [],
  },
  carousel: {
    currentSlide: 1,
    lastSlide: 1,
  },
  citiesFiltered: {
    params: {
      search: '',
      page: 0, // da igual si es 0 o 1, el backend lo maneja
      sort: CITIES_DEFAULT_SORT_OPTION.rawValue,
      order: CITIES_DEFAULT_SORT_OPTION.order,
      totalPages: 0,
      totalCount: 0,
    },
    loading: true,
    error: null,
    data: [],
  },
};

const citiesReducer = createReducer(citiesState, (builder) => {
  builder
    .addCase(
      'SET_CURRENT_SLIDE',
      (
        state,
        action: {
          type: 'SET_CURRENT_SLIDE';
          payload: { currentSlide: number };
        }
      ) => {
        state.carousel.currentSlide = action.payload.currentSlide;
      }
    )
    .addCase(
      'RECORD_CURRENT_SLIDE', // Accion lanzada por RouteChangeHandler
      (
        state,
        _action: {
          type: 'RECORD_CURRENT_SLIDE';
        }
      ) => {
        state.carousel.lastSlide = state.carousel.currentSlide;
      }
    )

    .addCase(fetchCities.pending, (state) => {
      state.citiesFiltered.loading = true;
    })
    .addCase(fetchCities.fulfilled, (state, action) => {
      state.citiesFiltered.params = {
        ...state.citiesFiltered.params,
        ...action.payload.params,
      };

      state.citiesFiltered.data = action.payload.cities;
      state.citiesFiltered.loading = false;
    })
    .addCase(fetchCities.rejected, (state, action) => {
      state.citiesFiltered.params.search = '';
      state.citiesFiltered.params.sort = CITIES_DEFAULT_SORT_OPTION.rawValue;
      state.citiesFiltered.params.page = 0;
      state.citiesFiltered.params.totalPages = 0;
      state.citiesFiltered.params.totalCount = 0;
      state.citiesFiltered.params.order = CITIES_DEFAULT_SORT_OPTION.order;

      state.citiesFiltered.loading = false;
      state.citiesFiltered.error = action.error;
    })

    .addCase(fetchPopularCities.pending, (state) => {
      state.popularCities.loading = true;
    })
    .addCase(fetchPopularCities.fulfilled, (state, action) => {
      state.popularCities.loading = false;
      state.popularCities.data = action.payload.cities;
    })
    .addCase(fetchPopularCities.rejected, (state, action) => {
      state.popularCities.loading = false;
      state.popularCities.error = action.error;
    });
});

export default citiesReducer;

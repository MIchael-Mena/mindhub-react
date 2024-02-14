import { createAsyncThunk } from '@reduxjs/toolkit';
import { CityBasic } from '../../models/CityBasic';
import { ApiService } from '../../services/api.service';
import { PaginationData } from '../../models/PaginationData';
import { CitySearchParams } from '../../modules/cities/models/CitySearchParams';
import { AppDispatch, RootState } from '../store';

interface CityGetResponse extends PaginationData {
  cities: CityBasic[];
}

/* const fetchCitiesMiddleware: Middleware =
  ({ getState }: { getState: () => RootState }) =>
  (next: Dispatch) =>
  (action: AnyAction) => {
    if (action.type === fetchCities.pending.type) {
      const { totalCount, totalPages, ...currentParams } =
        getState().citiesReducer.citiesFiltered.params;
      const newParams = action.meta.arg;

      if (JSON.stringify(currentParams) === JSON.stringify(newParams)) {
        // Aunque se haga el return no se evita que se ejecute fetchCities
        // solo se conseguir saltar fetchCities.pending
        return;
      }
    }

    // Si los parámetros son diferentes, despachamos la acción como de costumbre
    return next(action);
  }; */

const fetchCities =
  (params: CitySearchParams) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const { totalCount, totalPages, ...currentParams } =
      getState().citiesReducer.citiesFiltered.params;

    // Si los parámetros son los mismos, no hacemos nada
    if (JSON.stringify(currentParams) === JSON.stringify(params)) {
      return;
    }

    // Si los parámetros son diferentes, despachamos fetchCities
    dispatch(fetchCitiesBasedOnParams(params));
  };

const fetchCitiesBasedOnParams = createAsyncThunk<
  { cities: CityBasic[]; params: CitySearchParams & PaginationData },
  CitySearchParams,
  { state: RootState }
>('fetchCities', async (payload: CitySearchParams) => {
  console.log('fetchCities', payload);
  try {
    const { search, page, sort, order } = payload;
    const cityGetResponse = await ApiService.getData<CityGetResponse>('/city', {
      // populate_itineraries: true,
      basic_info: true, // Evito traer algunos campos que no necesito como la fecha de creacion, etc
      limit: 9,
      ...payload,
    });
    const { cities, ...paramsRes } = cityGetResponse;
    const params = { search, page, sort, ...paramsRes, order };

    return { cities, params };
  } catch (error) {
    throw error;
  }
});

const fetchPopularCities = createAsyncThunk<
  { cities: CityBasic[] },
  { limit: number }
>('fetchPopularCities', async (payload: { limit: number }) => {
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
});

export { fetchCities, fetchPopularCities, fetchCitiesBasedOnParams };

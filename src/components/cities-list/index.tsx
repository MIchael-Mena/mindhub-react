import { Box, CircularProgress } from '@mui/material';
// import { useApiService } from '../../hooks/useApiService';
// import { ApiService } from '../../services/api.service';
// import { City } from '../../models/City';
import CardCity from '../card-city';
import { useLocation } from 'react-router-dom';
import { FailedRequest } from '../failed-request';
import { CardNotFound } from '../card-city/CardNotFound';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useEffect } from 'react';
import { fetchCities } from '../../store/actions/cities';

interface LocationState {
  from: string;
  clean?: boolean;
}

export const CitiesList = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const {
    data: cities,
    loading,
    error,
    hasBeenModified, // Es False la primera vez que se renderiza el componente (antes de llamar a fetchCities)
  } = useAppSelector((store) => store.citiesReducer.cities);
  const searchParam = new URLSearchParams(location.search).get('search') || '';

  useEffect(() => {
    // // Con esta version funciona el scroll restoration al volver a cities-list desde city-detail
    // let state = location.state as LocationState;
    // if (state?.from === 'finder' || !hasBeenModified) {
    //   history.replaceState(
    //     { from: '/cities' },
    //     '',
    //     location.pathname + location.search
    //   );
    //   // actualizo el state para que no se vuelva a llamar a fetchCities cuando se usa el buton de volver en city-detail
    //   // ya que al volver queda el state de la busqueda anterior y se vuelve a llamar a fetchCities
    //   dispatch(fetchCities(searchParam ? { search: searchParam } : {}));
    // }
    dispatch(fetchCities(searchParam ? { search: searchParam } : {}));
  }, [searchParam]);

  // const {
  //   data: cities,
  //   loading,
  //   error,
  // } = useApiService<City[]>(
  //   () =>
  //     !searchParam
  //       ? ApiService.getData('/city')
  //       : ApiService.getData('/city', { search: searchParam }),
  //   [searchParam]
  // );

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 3,
          marginTop: 4,
          minHeight: 400,
        }}
      >
        {loading ? (
          <CircularProgress color="secondary" size={200} />
        ) : error ? (
          <FailedRequest message="Oops! Something went wrong." width="290px" />
        ) : cities.length === 0 && searchParam ? ( // Podria usar 404 del error como condicion
          <CardNotFound
            message={`No cities found for "${searchParam}", try again.`}
          />
        ) : cities.length === 0 ? (
          <CardNotFound />
        ) : (
          cities.map((city, index) => <CardCity key={index} city={city} />)
        )}
      </Box>
    </>
  );
};

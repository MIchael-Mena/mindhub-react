import { Box, CircularProgress } from '@mui/material';
// import { useApiService } from '../../hooks/useApiService';
// import { ApiService } from '../../services/api.service';
// import { City } from '../../models/City';
import CardCity from '../card-city';
import { useLocation } from 'react-router-dom';
import { FailedRequest } from '../../../shared/components/failed-request';
import { CardNotFound } from '../../../shared/components/card-not-found/CardNotFound';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { useEffect } from 'react';
import { fetchCities } from '../../../../store/actions/cities';

// interface LocationState {
//   from: string;
// }

export const CitiesList = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const {
    currentSearch,
    data: cities,
    loading,
    error,
  } = useAppSelector((store) => store.citiesReducer.citiesFiltered);
  const searchParam = new URLSearchParams(location.search).get('search') || '';
  const pageParam = new URLSearchParams(location.search).get('page') || 1;

  useEffect(() => {
    console.log(
      'SearchParam , cities.length y currentSearch: ',
      searchParam,
      cities.length,
      currentSearch
    );
    // En el caso que no tenga parametro y ya tenga ciudades, no hago nada. Ya que estoy seguro que son todas las ciudades
    // if (!searchParam && cities.length > 0) return;
    // Falta el caso en que tenga parametro y ya tenga ciudades que coincidan con el parametro entonces no deberia hacer nada
    if (currentSearch === searchParam && cities.length > 0) return;
    console.log('Se ejecuta el dispatch');
    dispatch(
      fetchCities(
        searchParam
          ? { search: searchParam, page: pageParam }
          : { page: pageParam }
      )
    );
  }, [searchParam]);

  // Desventaja: la restauracion de scroll no funciona al volver a la pagina
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

// TODO: conseguir evitar pedir la lista de ciudades si ya se tiene en el store
// y no se ha modificado con respecto a la ultima vez que se pidio
// useEffect(() => {
//   const handlePopState = (event: PopStateEvent) => {
//     // El evento popstate se dispara cuando el usuario utiliza el botón de "volver atrás" del navegador
//     // Puedes realizar acciones específicas aquí cuando esto suceda
//     console.log('El usuario utilizó el botón de volver atrás');
//     console.log(event.state);
//   };

//   window.addEventListener('popstate', handlePopState);

//   return () => {
//     // Limpia el manejador de eventos cuando el componente se desmonta
//     window.removeEventListener('popstate', handlePopState);
//   };
// }, []);

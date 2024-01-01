import { Box, CircularProgress } from '@mui/material';
import CardCity from '../card-city';
import { useLocation } from 'react-router-dom';
import { FailedRequest } from '../../../shared/components/failed-request';
import { CardNotFound } from '../../../shared/components/card-not-found/CardNotFound';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { useEffect } from 'react';
import { fetchCities } from '../../../../store/actions/cities';

export const CitiesList = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const {
    data: cities,
    currentSearch,
    loading,
    error,
  } = useAppSelector((store) => store.citiesReducer.citiesFiltered);
  const searchParam = new URLSearchParams(location.search).get('search') || '';
  const pageParam = parseInt(
    new URLSearchParams(location.search).get('page') || '1'
  );

  useEffect(() => {
    if (currentSearch === searchParam && cities.length > 0) return;
    // Significa que ya se hizo la busqueda y tengo los datos, no hago nada

    dispatch(
      fetchCities(
        searchParam
          ? { search: searchParam, page: pageParam }
          : { page: pageParam }
      )
    );
  }, [searchParam]);

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

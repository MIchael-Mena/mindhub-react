import { Box } from '@mui/material';
import { FailedRequest } from '../../../shared/components/failed-request';
import { CardNotFound } from '../../../shared/components/card-not-found/CardNotFound';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { useEffect } from 'react';
import { fetchCities } from '../../../../store/actions/cities';
import { useUrlParams } from '../../hooks/useUrlParams';
import { CardCitySkeleton } from '../card-city-skeleton';
import { CardCityLoader } from '../card-city-loader';

export const CitiesList = () => {
  const dispatch = useAppDispatch();
  const { searchParam, pageParam, sortParam } = useUrlParams();
  const {
    data: cities,
    params: { search: currentSearch, sort: currentSort, page: currentPage },
    loading,
    error,
  } = useAppSelector((store) => store.citiesReducer.citiesFiltered);

  useEffect(() => {
    if (
      currentSearch === searchParam &&
      currentPage === pageParam &&
      currentSort === sortParam &&
      cities.length > 0
    )
      return; // Si la busqueda en la url es igual a la busqueda actual, no hago nada

    dispatch(
      fetchCities({
        search: searchParam,
        page: pageParam,
        sort: sortParam,
      })
    );
  }, [searchParam, pageParam, sortParam]);

  const skeletonCount = cities.length > 0 ? cities.length : 3;
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 3,
          minHeight: 400,
        }}
      >
        {/* loading && cities.length === 0 ? Si utilio esta condicion no se mostrara el estado cargando si ya tengo datos guardados*/}
        {loading ? (
          Array.from(Array(skeletonCount).keys()).map((i) => (
            <CardCitySkeleton key={i} />
          ))
        ) : error ? (
          <FailedRequest
            message="An error has occurred, try again later."
            width="300px"
          />
        ) : cities.length === 0 && searchParam ? (
          <CardNotFound
            message={`No cities found for "${searchParam}", try again.`}
          />
        ) : cities.length === 0 ? (
          <CardNotFound message="Sorry, there are no cities available." />
        ) : (
          cities.map((city, index) => (
            <CardCityLoader key={index} city={city} />
          ))
        )}
      </Box>
    </>
  );
};

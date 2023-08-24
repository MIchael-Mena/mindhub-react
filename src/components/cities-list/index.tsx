import { Box, CircularProgress } from '@mui/material';
import { useApiService } from '../../hooks/useApiService';
import { ApiService } from '../../services/api.service';
import CardCity from '../card-city';
import { City } from '../../models/City';
import { useLocation } from 'react-router-dom';
import { FailedRequest } from '../failed-request';
import { CardNotFound } from '../card-city/CardNotFound';

export const CitiesList = () => {
  const location = useLocation();
  const searchParam = new URLSearchParams(location.search).get('search') || '';
  const {
    data: cities,
    loading,
    error,
  } = useApiService<City[]>(
    () =>
      !searchParam
        ? ApiService.getData('/cities')
        : ApiService.getData('/cities', { search: searchParam }),
    [searchParam]
  );

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 3,
          marginTop: 4,
          minHeight: '305px',
        }}
      >
        {loading ? (
          <CircularProgress color="secondary" size={'200px'} />
        ) : error ? (
          <FailedRequest message="Oops! Something went wrong." width="290px" />
        ) : cities.length === 0 && searchParam ? (
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

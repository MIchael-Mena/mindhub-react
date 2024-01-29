import CityGrid from '../city-grid';
import { Paper } from '@mui/material';
import { useEffect, useMemo } from 'react';
// import { useApiService } from '../../hooks/useApiService';
// import { ApiService } from '../../services/api.service';
import { FailedRequest } from '../../../shared/components/failed-request';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { fetchPopularCities } from '../../../../store/actions/cities';
import { chunkArray } from '../../../../utils/util';
import { CitiesCarousel } from '../cities-carousel';
import './style.css';

const PopularCities = () => {
  const dispatch = useAppDispatch();
  const {
    data: popularCities,
    loading,
    error,
  } = useAppSelector((store) => store.citiesReducer.popularCities);

  useEffect(() => {
    if (popularCities.length === 0) dispatch(fetchPopularCities({ limit: 12 }));
  }, []);

  // const {
  //   data: popularCities,
  //   loading,
  //   error,
  // } = useApiService<City[]>(() =>
  //   ApiService.getData('/city', { limit: 12, sort: 'rating', order: 'desc' })
  // );

  const groupedCities = useMemo(() => {
    return chunkArray(popularCities, 4);
  }, [popularCities]);

  return (
    <>
      <CitiesCarousel>
        {loading || error ? (
          <Paper
            sx={{ p: { xs: 1 }, px: { sm: 4 }, py: { sm: 2 } }}
            elevation={3}
            className="common-paper"
          >
            {loading ? (
              // <CircularProgress size={'250px'} />
              <CityGrid />
            ) : (
              <FailedRequest message="An error has occurred, try again later." />
            )}
          </Paper>
        ) : (
          groupedCities.map((cities, index) => (
            <Paper
              sx={{ p: { xs: 1 }, px: { sm: 4 }, py: { sm: 2 } }}
              elevation={3}
              key={index}
              className="common-paper"
            >
              <CityGrid cities={cities} />
            </Paper>
          ))
        )}
      </CitiesCarousel>
    </>
  );
};

export default PopularCities;

import { useParams } from 'react-router-dom';
// import { useApiService } from '../hooks/useApiService';
// import { ApiService } from '../services/api.service';
// import { City } from '../models/City';
import {
  Box,
  CircularProgress,
  Container,
  Fab,
  Grid,
  Paper,
} from '@mui/material';
import { FailedRequest } from '../components/failed-request';
import { useNavigate } from 'react-router-dom';
import { DoubleArrow } from '@mui/icons-material';
import { CityAttributes } from '../components/city-attributes';
import { CityInfo } from '../components/city-info';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchCitySelectedById } from '../store/actions/cities';
import { useEffect } from 'react';
import { CardNotFound } from '../components/card-city/CardNotFound';
import { Itineraries } from '../components/itineraries';

const CityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: city,
    loading,
    error,
  } = useAppSelector((store) => store.citiesReducer.citySelected);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id && city && city._id !== id) {
      dispatch(fetchCitySelectedById({ id }));
    }
  }, [id]);

  // const {
  //   data: city,
  //   loading,
  //   error,
  // } = useApiService<City>(() => ApiService.getData(`/city/${id}`));

  return (
    <Container disableGutters maxWidth="lg" sx={{ alignSelf: 'center' }}>
      <Paper
        elevation={5}
        sx={{ mt: 4, mb: 2, p: 4, position: 'relative', borderRadius: 5 }}
      >
        <Fab
          variant="extended"
          color="primary"
          size="medium"
          onClick={() => {
            navigate(-1);
          }}
          sx={{ borderRadius: 15, position: 'absolute', top: -24, left: 20 }}
        >
          <DoubleArrow sx={{ mr: 1, transform: 'rotate(180deg)' }} />
          Go Back
        </Fab>
        {loading || error ? (
          <Box
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            minHeight={500}
          >
            {loading ? (
              <CircularProgress color="secondary" size={200} />
            ) : error?.code === 'ERR_BAD_REQUEST' ? (
              <CardNotFound message={`No city found with id "${id}".`} />
            ) : (
              <FailedRequest width="290px" />
            )}
          </Box>
        ) : (
          <Grid container spacing={3}>
            <CityInfo {...city} />

            <Grid item xs={12} md={6}>
              <img
                src={city.images[0]}
                alt={city.name}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  borderRadius: 10,
                  border: '1px solid #ccc',
                  boxShadow: '5px 5px 5px 1px rgba(0, 0, 0, 0.3)',
                }}
              />
            </Grid>

            <CityAttributes {...city} />

            {city.itineraries!.length > 0 && (
              <Grid item xs={12}>
                <Itineraries itineraries={city.itineraries!} />
              </Grid>
            )}
          </Grid>
        )}
      </Paper>
    </Container>
  );
};

export default CityDetail;

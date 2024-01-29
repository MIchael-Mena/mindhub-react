import { useParams } from 'react-router-dom';
// import { useApiService } from '../hooks/useApiService';
// import { ApiService } from '../services/api.service';
// import { City } from '../models/City';
import {
  Box,
  CircularProgress,
  Container,
  Divider,
  Fab,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import { FailedRequest } from '../../shared/components/failed-request';
import { useNavigate } from 'react-router-dom';
import { DoubleArrow } from '@mui/icons-material';
import { CityAttributes } from '../components/city-attributes';
import { CityInfo } from '../components/city-info';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { useEffect } from 'react';
import { CardNotFound } from '../../shared/components/card-not-found/CardNotFound';
import { Itineraries } from '../components/itineraries';
import TitleUnderlined from '../../shared/components/styled/TitleUnderlined';
import { fetchCitySelectedById } from '../../../store/actions/city-selected';
import { shallowEqual } from 'react-redux';
import { ItineraryImg } from '../components/itinerary-img';

const CityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: city,
    loading,
    error,
  } = useAppSelector((store) => store.citySelectedReducer.city, shallowEqual);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // En caso de que el usuario ingrese a la url directamente
    if (id && city && city._id !== id) {
      dispatch(fetchCitySelectedById({ id }));
    }
  }, [id]);

  return (
    <Container disableGutters maxWidth="lg" sx={{ alignSelf: 'center' }}>
      <Paper
        elevation={5}
        sx={{
          mt: 4,
          mb: 2,
          py: 4,
          px: { xs: 1, sm: 4 },
          position: 'relative',
          borderRadius: 5,
        }}
      >
        <Fab
          variant="extended"
          color="secondary"
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
              <CardNotFound message="The requested city does not exist." />
            ) : (
              <FailedRequest width="290px" />
            )}
          </Box>
        ) : (
          <Grid container spacing={3}>
            <CityInfo {...city} />

            <Grid item xs={12} md={6}>
              <ItineraryImg cityName={city.name} images={city.images} />
              {/*               <img
                src={city.images[0]}
                alt={city.name}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  borderRadius: 10,
                  border: '1px solid #ccc',
                  boxShadow: '5px 5px 5px 1px rgba(0, 0, 0, 0.3)',
                }}
              /> */}
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ backgroundColor: 'white' }} />
              <CityAttributes {...city} />
              <Divider sx={{ backgroundColor: 'white' }} />
            </Grid>

            <Grid item xs={12}>
              <TitleUnderlined pr={2} pl={1} display="inline-flex" mb={2}>
                <Typography variant="h4" gutterBottom>
                  Itineraries
                </Typography>
              </TitleUnderlined>
              {city.itineraries! && city.itineraries.length > 0 ? (
                <Itineraries itineraries={city.itineraries!} />
              ) : (
                <Box display="flex" justifyContent="center">
                  <CardNotFound message="No itineraries found for this city." />
                </Box>
              )}
            </Grid>
          </Grid>
        )}
      </Paper>
    </Container>
  );
};

export default CityDetail;

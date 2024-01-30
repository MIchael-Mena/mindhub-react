import { useParams } from 'react-router-dom';
import {
  Box,
  CircularProgress,
  Container,
  Divider,
  Fab,
  Grid,
  Paper,
} from '@mui/material';
import { FailedRequest } from '../../shared/components/failed-request';
import { useNavigate } from 'react-router-dom';
import { DoubleArrow } from '@mui/icons-material';
import { CityAttributes } from '../components/city-attributes';
import { CityInfo } from '../components/city-info';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { useEffect } from 'react';
import { CardNotFound } from '../../shared/components/card-not-found/CardNotFound';
import { fetchCitySelectedById } from '../../../store/actions/city-selected';
import { shallowEqual } from 'react-redux';
import { ItineraryImg } from '../components/itinerary-img';
import { ItinerariesSection } from '../components/itineraries-section';

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
            <Grid
              item
              xs={12}
              md={6}
              display={'flex'}
              flexDirection={'column'}
              justifyContent={'space-evenly'}
            >
              <CityInfo {...city} />
            </Grid>

            <Grid item xs={12} md={6}>
              <ItineraryImg cityName={city.name} images={city.images} />
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ backgroundColor: 'white' }} />
              <CityAttributes {...city} />
              <Divider sx={{ backgroundColor: 'white' }} />
            </Grid>

            <Grid item xs={12}>
              <ItinerariesSection itineraries={city.itineraries!} />
            </Grid>
          </Grid>
        )}
      </Paper>
    </Container>
  );
};

export default CityDetail;

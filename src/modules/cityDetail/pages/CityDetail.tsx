import { useParams } from 'react-router-dom';
import { Box, Container, Divider, Grid, Paper } from '@mui/material';
import { FailedRequest } from '../../shared/components/failed-request';
import { CityAttributes } from '../components/city-attributes';
import { CityInfo } from '../components/city-info';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { useEffect } from 'react';
import { CardNotFound } from '../../shared/components/card-not-found/CardNotFound';
import { fetchCitySelectedById } from '../../../store/actions/city-selected';
import { shallowEqual } from 'react-redux';
import { ItineraryImg } from '../components/itinerary-img';
import { ItinerarySection } from '../components/itinerary-section';
import { CityInfoSkeleton } from '../components/city-info-skeleton';
import { CityAttributesSkeleton } from '../components/city-attributes-skeleton';
import { ButtonBack } from '../components/button-back';
import { ItinerarySectionSkeleton } from '../components/itinerary-section-skeleton';

const CityDetail = () => {
  const { id } = useParams();
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
          minHeight: 500,
        }}
      >
        <ButtonBack />
        {error ? (
          <Box
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            minHeight={500}
          >
            {error?.code === 'ERR_BAD_REQUEST' ? (
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
              {loading ? <CityInfoSkeleton /> : <CityInfo city={city} />}
            </Grid>

            <Grid item xs={12} md={6}>
              <ItineraryImg
                cityName={city.name}
                images={city.images}
                parentLoading={loading}
              />
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ backgroundColor: 'white' }} />
              {loading ? (
                <CityAttributesSkeleton />
              ) : (
                <CityAttributes {...city} />
              )}
              <Divider sx={{ backgroundColor: 'white' }} />
            </Grid>

            <Grid item xs={12}>
              {loading ? (
                <ItinerarySectionSkeleton />
              ) : (
                <ItinerarySection itineraries={city.itineraries!} />
              )}
            </Grid>
          </Grid>
        )}
      </Paper>
    </Container>
  );
};

export default CityDetail;

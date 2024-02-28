import { Button, Container, Divider, Grid, Typography } from '@mui/material';
import PopularCities from '../components/popular-cities';
import Logo from '../../core/components/logo';
import Hero from '../../shared/components/hero';
import { useNavigate } from 'react-router-dom';
import heroImage from '../../../assets/images/home-bg.png';
import callToAction from '../../../assets/images/call-to-action.png';
import heorImageLowQuality from '../../../assets/images/home-bg-low-quality.png';
// Se hizo un preload de la imagen en baja calidad para que se cargue antes de que el usuario llegue a la página.

const Home = () => {
  // const heroImage = 'src/assets/images/home-bg.png';
  // const callToAction = 'src/assets/images/call-to-action.png';
  // const heorImageLowQuality = 'src/assets/images/home-bg-low-quality.png';
  const navigate = useNavigate();

  return (
    <Container disableGutters maxWidth="lg">
      <Hero
        imageHeroHighQuality={heroImage}
        size="74%"
        imageHeroLowQuality={heorImageLowQuality}
      >
        <Logo sizeXs={'medium'} sizeSm={'large'} animation />
        <Typography
          variant="h5"
          color={'success.main'}
          textAlign={'center'}
          fontStyle={'italic'}
        >
          Find your perfect trip, designed by insiders who know and love their
          cities!
        </Typography>
      </Hero>

      <Grid container spacing={{ xs: 0 }} mx={3} minHeight={600} width={'auto'}>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            pl: { xs: 6, sm: 0 },
            pr: { xs: 6 },
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            order: { xs: 2, sm: 1 },
          }}
        >
          <img
            src={callToAction}
            alt="logo"
            width="100%"
            height="auto"
            loading="eager"
          />
        </Grid>

        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            px: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            order: { xs: 1, sm: 2 },
          }}
        >
          <Typography variant="h1" fontWeight={'bold'} my={2}>
            Find the perfect destination
          </Typography>
          <Typography variant="body1" my={2}>
            Our app will help you find the perfect path for your next trip. With
            an easy-to-use interface and a host of itinerary options, planning
            your next trip has never been easier.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ my: 2 }}
            fullWidth
            onClick={() =>
              navigate('/cities', { state: { preventScrollReset: false } })
            }
          >
            View More
          </Button>
        </Grid>
      </Grid>

      <Divider variant="middle" />

      <PopularCities />
    </Container>
  );
};

export default Home;

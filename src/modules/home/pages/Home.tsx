import { Button, Container, Divider, Grid, Typography } from '@mui/material';
import PopularCities from '../components/popular-cities';
import Logo from '../../core/components/logo';
import Hero from '../../shared/components/hero';
import { Link as Anchor } from 'react-router-dom';
import imageHero from '../../../assets/images/cities-bg.png';
import imageToCities from '../../../assets/images/hero-intro.png';

const Home = () => {
  // const imageHero = 'src/assets/images/cities-bg.png';
  // const imageToCities = 'src/assets/images/hero-intro.png';
  const currentPath = '/home';

  return (
    <Container disableGutters maxWidth="lg">
      <Hero imageHero={imageHero} size="65%">
        <Logo sizeXs={'medium'} sizeSm={'large'} />
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
          }}
        >
          <img
            src={imageToCities}
            alt="logo"
            width="100%"
            height="auto"
            loading="lazy"
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
          <Anchor
            to="/Cities"
            preventScrollReset={false}
            state={{ from: currentPath }}
            style={{ width: '100%', display: 'contents' }}
          >
            <Button variant="contained" color="primary" sx={{ my: 2 }}>
              View More
            </Button>
          </Anchor>
        </Grid>
      </Grid>

      <Divider variant="middle" />

      <PopularCities />
    </Container>
  );
};

export default Home;

import { Container, Divider, Typography } from '@mui/material';
import Finder from '../components/finder';
import Hero from '../components/hero';
import { CitiesList } from '../components/cities-list';

const Cities = () => {
  const heroImage = 'src/assets/images/city-bg.png';
  return (
    <>
      <Container
        disableGutters
        maxWidth={'lg'}
        sx={{
          alignSelf: 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          pb: 3,
        }}
      >
        <Hero imageHero={heroImage} size="74%">
          <Typography variant="h1">Cities</Typography>
          <Typography variant="h5" color="success.main">
            Collection of the most beautiful places and experiences in the world
            to visit and enjoy.
          </Typography>
        </Hero>

        <Divider sx={{ width: '90%', mt: 3, mb: 3 }} />

        <Finder />

        <CitiesList />
      </Container>
    </>
  );
};

export default Cities;

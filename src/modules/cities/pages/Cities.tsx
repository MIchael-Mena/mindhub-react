import { Container, Divider, Grid, Typography } from '@mui/material';
import Finder from '../components/finder';
import Hero from '../../shared/components/hero';
import { CitiesList } from '../components/cities-list';
import { PaginationControls } from '../components/pagination-controls';
import { SortCities } from '../components/sort-cities';
import { CitiesCountDisplay } from '../components/cities-count-display';
import heroImage from '../../../assets/images/city-bg.png';

const Cities = () => {
  // const heroImage = 'src/assets/images/city-bg.png';
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
          gap: 5,
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

        <Divider sx={{ width: '90%' }} />

        <Grid container alignItems="center" rowGap={3} px={{ md: 6 }}>
          <Grid
            item
            xs={12}
            md={6}
            lg={4}
            order={{ xs: 3, lg: 1 }}
            display="inline-flex"
            justifyContent={{ xs: 'center', md: 'flex-end', lg: 'flex-start' }}
          >
            <CitiesCountDisplay />
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            lg={4}
            display="inline-flex"
            justifyContent="center"
            order={{ xs: 1, lg: 1 }}
          >
            <Finder />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            lg={4}
            display="inline-flex"
            justifyContent={{ xs: 'center', md: 'flex-start', lg: 'flex-end' }}
            gap={1}
            alignItems="center"
            order={{ xs: 2, lg: 1 }}
          >
            <SortCities />
          </Grid>
        </Grid>

        <CitiesList />

        <PaginationControls />
      </Container>
    </>
  );
};

export default Cities;

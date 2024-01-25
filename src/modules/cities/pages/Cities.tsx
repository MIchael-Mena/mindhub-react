import { Container, Divider, Grid, Typography } from '@mui/material';
import Finder from '../components/finder';
import Hero from '../../shared/components/hero';
import { CitiesList } from '../components/cities-list';
import { PaginationControls } from '../components/pagination-controls';
import { SortButton } from '../components/sort-button';
import { CitiesCountDisplay } from '../components/cities-count-display';

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

        <Grid container alignItems="center" rowGap={2} px={{ md: 6 }}>
          <Grid item xs={12} md={4}>
            <CitiesCountDisplay />
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            display="inline-flex"
            justifyContent="center"
          >
            <Finder />
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            display="inline-flex"
            gap={1}
            justifyContent={{ xs: 'center', md: 'flex-end' }}
            alignItems="center"
          >
            <SortButton />
          </Grid>
        </Grid>

        <CitiesList />

        <PaginationControls />
      </Container>
    </>
  );
};

export default Cities;

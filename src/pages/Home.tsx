import { Box, Button, Divider, Grid, Typography } from '@mui/material'
import './Home.css'
import CitysCarousel from '../components/citys-carousel'
import Logo from '../components/logo'
import { Link as Anchor } from 'react-router-dom'

const Home = () => {
  const imageURL = 'src/assets/images/hero-intro.png'

  return (
    <>
      <Box
        px={6}
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        my={{ xs: 0, sm: 3 }}
      >
        <Logo size="large" />
        <Typography
          variant="h6"
          textAlign={'center'}
          mt={{ xs: 1, sm: 2 }}
          fontStyle={'italic'}
        >
          Find your perfect trip, designed by insiders who know and love their
          cities!
        </Typography>
      </Box>

      <Grid container spacing={{ xs: 0 }} mx={2} minHeight={600} width={'auto'}>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            px: 6,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <img src={imageURL} alt="logo" width="100%" height="auto" />
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
          <Typography variant="h1" sx={{ fontWeight: 'bold', my: 2 }}>
            Find the perfect destination
          </Typography>
          <Typography variant="body1" sx={{ my: 2 }}>
            Our app will help you find the perfect path for your next trip. With
            an easy-to-use interface and a host of itinerary options, planning
            your next trip has never been easier.
          </Typography>
          <Anchor to="/Cities" style={{ width: '100%', display: 'contents' }}>
            <Button variant="contained" color="primary" sx={{ my: 2 }}>
              View More
            </Button>
          </Anchor>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      <CitysCarousel />
    </>
  )
}

export default Home

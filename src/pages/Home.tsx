import { Button, Divider, Grid, Typography } from '@mui/material'
import './Home.css'
import CitysCarousel from '../components/citys-carousel'

const Home = () => {
  // const imageURL = 'src/assets/no-img-up.png'

  return (
    <>
      <Grid container spacing={{ xs: 0 }} mx={2} height={600} width={'auto'}>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            px: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Typography variant="h1" gutterBottom>
            MyTinerary
          </Typography>
          <Typography variant="h5">
            Find your perfect trip, designed by insiders who know and love their
            cities!
          </Typography>
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
          <Button variant="contained" color="primary">
            View More
          </Button>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      <CitysCarousel />
    </>
  )
}

export default Home

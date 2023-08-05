import { Button, Grid, Paper, Typography } from '@mui/material'
import './Home.css'
import CitysCarousel from '../components/citys-carousel'

const Home = () => {
  const imageURL = 'src/assets/no-img-up.png'

  return (
    <>
      <Paper>
        <Typography variant="h2" component="h1" gutterBottom>
          MyTinerary
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Find your perfect trip, designed by insiders who know and love their
          cities!
        </Typography>
        <Button variant="contained" color="primary">
          Start Exploring
        </Button>
      </Paper>

      <Grid container spacing={2} m="0" pb="1rem" alignSelf="center">
        <Grid item xs={12} sm={8}>
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
        <Grid
          item
          xs={12}
          sm={4}
          sx={{
            px: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img src={imageURL} alt="no-img" className="main-img" />
        </Grid>
      </Grid>
      <CitysCarousel />
    </>
  )
}

export default Home

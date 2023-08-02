import { Button, Grid, Typography } from '@mui/material'
import './Home.css'

const Home = () => {
  const imageURL = 'src/assets/no-img-up.png'

  return (
    <>
      <Grid container spacing={2} m="0" pb="1rem" alignSelf="center">
        <Grid item xs={12} sm={8}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', my: 2 }}>
            Find the perfect destination
          </Typography>
          <Typography variant="body1" sx={{ my: 2 }}>
            Our app will help you find the perfect path for your next trip. With
            an easy-to-use interface and a host of itinerary options, planning
            your next trip has never been easier.
          </Typography>
          <Button
            variant="contained"
            sx={{ textTransform: 'capitalize' }}
            color="secondary"
          >
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
    </>
  )
}

export default Home

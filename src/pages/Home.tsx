import { Button, Grid, Typography, Paper } from '@mui/material'
import './Home.css'

import Carousel from 'react-material-ui-carousel'

function Example() {
  var items = [
    {
      name: 'Random Name #1',
      description: 'Probably the most random thing you have ever seen!',
    },
    {
      name: 'Random Name #2',
      description: 'Hello World!',
    },
  ]

  return (
    <Carousel
      sx={{ width: 'inherit' }}
      indicatorIconButtonProps={{
        style: {
          color: 'yellow',
        },
      }}
      activeIndicatorIconButtonProps={{
        style: {
          backgroundColor: '#fff',
        },
      }}
      indicatorContainerProps={{
        style: {
          marginTop: '2rem', // 5
          textAlign: 'center', // 4
        },
      }}
    >
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  )
}

function Item(props: { item: { name: string; description: string } }) {
  return (
    <Paper>
      <h2>{props.item.name}</h2>
      <p>{props.item.description}</p>

      <Button className="CheckButton">Check it out!</Button>
    </Paper>
  )
}

const Home = () => {
  const imageURL = 'src/assets/no-img-up.png'

  return (
    <>
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
        {/* <Divider/> */}
        <Example />
      </Grid>
    </>
  )
}

export default Home

import { Button, Grid, Paper, Typography } from '@mui/material'
import { Destination } from '../../models/Destination'

const PopularDestinations = ({
  destinations,
}: {
  destinations: Destination[]
}) => {
  return (
    <Paper sx={{ p: 3, borderRadius: '25px' }}>
      <Grid container spacing={2}>
        {destinations.map((destination, i) => (
          <Grid item xs={12} sm={6} key={i}>
            <img
              src={destination.image}
              alt={destination.city}
              draggable={false}
              style={{ width: '100%', height: '400px', objectFit: 'cover' }}
            />
            <Typography variant="h6">{destination.city}</Typography>
            <Typography variant="body1">{destination.description}</Typography>
            {/* <Button className="CheckButton">Check it out!</Button> */}
          </Grid>
        ))}
      </Grid>
    </Paper>
  )
}

export default PopularDestinations

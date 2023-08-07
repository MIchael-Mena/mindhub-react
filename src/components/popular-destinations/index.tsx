import { Grid, Paper } from '@mui/material'
import { Destination } from '../../models/Destination'
import CardDestination from '../card-destination'

const PopularDestinations = ({
  destinations,
}: {
  destinations: Destination[]
}) => {
  return (
    <Paper
      sx={{ borderRadius: '25px 25px 0 0', p: { xs: 1, sm: 4 } }}
      elevation={3}
    >
      <Grid container spacing={{ xs: 1, sm: 4 }} m="0">
        {destinations.map((destination, i) => (
          <Grid item xs={6} key={i}>
            <CardDestination {...destination} />
          </Grid>
        ))}
      </Grid>
    </Paper>
  )
}

export default PopularDestinations

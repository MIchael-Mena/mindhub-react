import { Grid, Paper } from '@mui/material'
import CardPopularCity from '../card-popular-city'
import { City } from '../../models/City'

const PopularDestinations = ({ destinations }: { destinations: City[] }) => {
  return (
    <Paper sx={{ borderRadius: 0, p: { xs: 1, sm: 4 } }} elevation={3}>
      <Grid container spacing={{ xs: 1, sm: 4 }} m="0">
        {destinations.map((destination, i) => (
          <Grid item xs={6} key={i}>
            <CardPopularCity {...destination} />
          </Grid>
        ))}
      </Grid>
    </Paper>
  )
}

export default PopularDestinations

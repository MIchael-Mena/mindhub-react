import { Grid } from '@mui/material';
import CardPopularCity from '../card-popular-city';
import { City } from '../../models/City';

const PopularDestinations = ({ destinations }: { destinations: City[] }) => {
  return (
    <Grid container spacing={{ xs: 1, sm: 4 }} m="0">
      {destinations.map((destination, i) => (
        <Grid item xs={6} key={i}>
          <CardPopularCity {...destination} />
        </Grid>
      ))}
    </Grid>
  );
};

export default PopularDestinations;

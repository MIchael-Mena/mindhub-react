import { Grid } from '@mui/material';
import CardPopularCity from '../card-popular-city';
import { City } from '../../models/City';

const PopularDestinations = ({ destinations }: { destinations: City[] }) => {
  return (
    <Grid container rowGap={1} spacing={{ xs: 1, sm: 4 }} m="0" height={'100%'}>
      {destinations.map((destination, i) => (
        <Grid item xs={6} key={i}>
          <CardPopularCity {...destination} />
        </Grid>
      ))}
    </Grid>
  );
};

export default PopularDestinations;

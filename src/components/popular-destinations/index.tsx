import { Grid } from '@mui/material';
import CardPopularCity from '../card-popular-city';
import { CityBasic } from '../../models/CityBasic';

const PopularDestinations = ({
  destinations,
}: {
  destinations: CityBasic[];
}) => {
  return (
    <Grid
      container
      rowGap={{ xs: 0, sm: 1 }}
      spacing={{ xs: 1, sm: 4 }}
      m="0"
      height={'100%'}
      rowSpacing={{ xs: 4 }}
    >
      {destinations.map((destination, i) => (
        <Grid item xs={6} key={i}>
          <CardPopularCity {...destination} />
        </Grid>
      ))}
    </Grid>
  );
};

export default PopularDestinations;

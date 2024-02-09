import { Grid } from '@mui/material';
import CardPopularCity from '../card-popular-city';
import { CityBasic } from '../../../../models/CityBasic';
import { CardPopularCitySkeleton } from '../card-popular-city-skeleton';

interface CityGridProps {
  cities?: CityBasic[];
}

const CityGrid = ({ cities }: CityGridProps) => {
  return (
    <Grid
      container
      rowGap={{ xs: 0, sm: 1 }}
      spacing={{ xs: 1, sm: 4 }}
      m="0"
      height={'100%'}
      rowSpacing={{ xs: 4 }}
    >
      {cities
        ? cities.map((city, i) => (
            <Grid item xs={6} key={i}>
              <CardPopularCity {...city} />
            </Grid>
          ))
        : Array.from(Array(4).keys()).map((i) => (
            <Grid item xs={6} key={i}>
              <CardPopularCitySkeleton key={i} />
            </Grid>
          ))}
    </Grid>
  );
};

export default CityGrid;

import { FlagCircleOutlined, PlaceTwoTone } from '@mui/icons-material';
import { Box, Fab, Grid, Rating, Typography } from '@mui/material';
import { CityBasic } from '../../../../models/CityBasic';
import TitleUnderlined from '../../../shared/components/styled/TitleUnderlined';

export const CityInfo = (city: CityBasic) => {
  return (
    <Grid
      item
      xs={12}
      md={6}
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'space-evenly'}
    >
      <Box
        display="inline-flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <TitleUnderlined display="inline-flex" gap={1} pr={2} pl={1}>
          <FlagCircleOutlined color="primary" fontSize="large" />
          <Typography variant="h4" gutterBottom>
            {city.country}
          </Typography>
        </TitleUnderlined>

        <Box display="inline-flex" gap={1} alignItems="center">
          <Fab variant="circular" color="primary" size="medium">
            <PlaceTwoTone color="secondary" fontSize="large" />
          </Fab>
          <Typography variant="h5">{city.name}</Typography>
        </Box>
      </Box>
      <Typography variant="body1" textAlign="center" my={3}>
        {city.description}
      </Typography>
      <Box display="inline-flex" gap={1}>
        <Typography variant="h5" gutterBottom>
          Rating:
        </Typography>
        <Rating
          name="city-rating"
          defaultValue={(city.rating / 10) * 5}
          max={5}
          precision={0.5}
          readOnly
        />
      </Box>
    </Grid>
  );
};

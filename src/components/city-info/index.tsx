import { FlagCircleOutlined, PlaceTwoTone } from '@mui/icons-material';
import { Box, Fab, Grid, Rating, Typography } from '@mui/material';
import { City } from '../../models/City';

export const CityInfo = (city: City) => {
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
        <Box
          display="inline-flex"
          gap={1}
          sx={{
            borderBottom: '3px solid #ccc',
            borderRadius: 5,
            px: 2,
          }}
        >
          <FlagCircleOutlined color="primary" fontSize="large" />
          <Typography variant="h4" gutterBottom>
            {city.country}
          </Typography>
        </Box>
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
          name="customized-10"
          defaultValue={(city.rating / 10) * 5}
          max={5}
          precision={0.5}
          readOnly
        />
      </Box>
    </Grid>
  );
};

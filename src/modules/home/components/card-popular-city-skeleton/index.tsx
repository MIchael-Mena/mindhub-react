import { Box, Divider, Skeleton } from '@mui/material';

// Aunque no este el import igula funciona, al parecer porque primero se esta cargando en otro componente
import '../card-popular-city/CardPopularCity.css';

export const CardPopularCitySkeleton = () => {
  return (
    <Box
      className="card-popular-city"
      sx={{
        overflow: 'visible',
      }}
    >
      <Skeleton
        variant="rounded"
        width="100%"
        height="100%"
        sx={{ borderRadius: '15px' }}
      />
      <Box
        className="title-container"
        width={{ xs: 'calc(100% - 30px)' }}
        sx={{
          backgroundColor: (theme) => theme.palette.background.paper,
        }}
      >
        <Skeleton variant="text" width="40%" />
        <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
        <Skeleton variant="text" width="60%" />
      </Box>
    </Box>
  );
};

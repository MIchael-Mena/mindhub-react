import { Box, Grid, Skeleton } from '@mui/material';

export const ItinerarySectionSkeleton = () => {
  return (
    <>
      <Box display="inline-flex" gap={1} pr={2} mb={2}>
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="text" width={100} />
      </Box>
      <Grid
        container
        sx={{
          bgcolor: 'background.paper',
          borderRadius: 3,
          borderTop: 3,
          borderColor: 'divider',
          boxShadow: 4,
          overflow: 'hidden',
        }}
      >
        <Skeleton variant="rectangular" width="100%" height={150} />
      </Grid>
    </>
  );
};

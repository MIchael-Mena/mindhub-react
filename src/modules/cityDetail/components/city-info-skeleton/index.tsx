import { Box, Skeleton } from '@mui/material';

export const CityInfoSkeleton = () => {
  return (
    <>
      <Box
        display="inline-flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box display="inline-flex" gap={1} pr={2} pl={1}>
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="text" width={100} />
        </Box>

        <Box display="inline-flex" gap={1} alignItems="center">
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="text" width={100} />
        </Box>
      </Box>

      <Box display="inline-flex" gap={1} flexDirection="column">
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="100%" />
      </Box>

      <Box display="inline-flex" gap={1}>
        <Skeleton variant="text" width={60} />
        <Skeleton variant="text" width={100} />
      </Box>
    </>
  );
};

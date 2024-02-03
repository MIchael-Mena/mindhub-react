import { Paper, Skeleton, Stack } from '@mui/material';

export const CityAttributesSkeleton = () => {
  return (
    <Paper
      elevation={0}
      sx={{ p: 2, my: 4, borderRadius: 3 }}
      variant="outlined"
    >
      <Stack
        direction="row"
        flexWrap="wrap"
        useFlexGap
        spacing={2}
        justifyContent={'space-around'}
        sx={{ mt: 1, mb: 1 }}
      >
        {[...Array(4)].map((_, index) => (
          <Skeleton
            key={index}
            variant="rectangular"
            width={150}
            height={32}
            sx={{
              borderRadius: '16px',
            }}
          />
        ))}
      </Stack>
    </Paper>
  );
};

import { Card, CardActions, CardContent, Skeleton } from '@mui/material';

export const CardCitySkeleton = () => {
  return (
    <Card
      elevation={1}
      sx={{
        maxWidth: 300,
        borderRadius: '15px',
        boxShadow: '5px 5px 5px 1px rgba(0, 0, 0, 0.3)',
        transition: 'box-shadow 0.3s ease-in-out',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Skeleton variant="rectangular" width={300} height={140} />
      <CardContent>
        <Skeleton variant="text" />
        <Skeleton variant="text" />
        <Skeleton variant="text" />
      </CardContent>
      <CardActions disableSpacing sx={{ justifyContent: 'end', mt: 'auto' }}>
        <Skeleton variant="rectangular" width={80} height={36} />
      </CardActions>
    </Card>
  );
};

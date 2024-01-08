import { Box, Card, CardContent, Typography } from '@mui/material';
import { Activity } from '../../../../models/Acitivity';

export const ActivityCard = (activity: Activity) => {
  return (
    <Card sx={{ borderRadius: 0, bgcolor: 'rgba(255, 255, 255, 0.0)' }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h6" component="div">
            {activity.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Duration: {activity.duration} minutes
          </Typography>
        </Box>
        <Typography variant="body1" color="text.secondary">
          {activity.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

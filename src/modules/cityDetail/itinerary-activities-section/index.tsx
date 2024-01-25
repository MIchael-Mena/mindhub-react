import { Box, Typography } from '@mui/material';
import { CardActivity } from '../components/card-activity';
import { useAppSelector } from '../../../store/hooks';
import { forwardRef } from 'react';

export const ItineraryActivitiesSection = forwardRef<HTMLDivElement>(
  (_props, refForward) => {
    const activities = useAppSelector(
      (store) => store.itineraryExtraReducer.data.activities
    );
    return (
      <>
        <Typography variant="h5" p={2} bgcolor="secondary.main">
          Activities
        </Typography>
        <Box ref={refForward}>
          {activities.map((activity) => (
            <CardActivity key={activity._id} {...activity} />
          ))}
        </Box>
      </>
    );
  }
);

import { Box, Typography } from '@mui/material';
import { CardActivity } from '../card-activity';
import { useAppSelector } from '../../../../store/hooks';
import { forwardRef } from 'react';

export const ItineraryActivitiesSection = forwardRef<
  HTMLDivElement,
  { titleHeightInPx?: string }
>(({ titleHeightInPx = '60px' }, refForward) => {
  const activities = useAppSelector(
    (store) => store.itineraryExtraReducer.data.activities
  );
  return (
    <>
      <Typography
        variant="h5"
        p={2}
        bgcolor="secondary.main"
        height={titleHeightInPx}
      >
        Activities
      </Typography>
      <Box ref={refForward}>
        {activities.map((activity) => (
          <CardActivity key={activity._id} {...activity} />
        ))}
      </Box>
    </>
  );
});

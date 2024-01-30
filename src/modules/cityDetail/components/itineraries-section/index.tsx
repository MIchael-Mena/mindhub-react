import { Box, Typography } from '@mui/material';
import { ItineraryExtra } from '../itinerary-extra';
import { Itinerary } from '../../../../models/Itinerary';
import { useState } from 'react';
import { ItinerariesTab } from '../itineraries-tab';
import TitleUnderlined from '../../../shared/components/styled/TitleUnderlined';
import { CardNotFound } from '../../../shared/components/card-not-found/CardNotFound';

interface ItinerariesSectionProps {
  itineraries: Itinerary[];
}

export const ItinerariesSection = ({
  itineraries,
}: ItinerariesSectionProps) => {
  const [activeItinerary, setActiveItinerary] = useState<number>(0);
  const animationDuration = 500;

  return (
    <>
      <TitleUnderlined pr={2} pl={1} display="inline-flex" mb={2}>
        <Typography variant="h4" gutterBottom>
          Itineraries
        </Typography>
      </TitleUnderlined>
      {itineraries! && itineraries.length > 0 ? (
        <>
          <Box
            sx={{
              flexGrow: 1,
              bgcolor: 'background.paper',
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              height: { xs: '300px', md: itineraries.length > 2 ? 175 : 150 },
              borderRadius: 3,
              boxShadow: 1,
              overflow: 'hidden',
            }}
          >
            <ItinerariesTab
              activeItinerary={activeItinerary}
              setActiveItinerary={setActiveItinerary}
              itineraries={itineraries}
              animationDuration={animationDuration}
            />
          </Box>
          <ItineraryExtra
            activeItineraryId={itineraries[activeItinerary]._id}
            animationDuration={animationDuration}
          />
        </>
      ) : (
        <Box display="flex" justifyContent="center">
          <CardNotFound message="No itineraries found for this city." />
        </Box>
      )}
    </>
  );
};

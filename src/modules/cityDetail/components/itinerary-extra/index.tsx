import { Collapse, Grid } from '@mui/material';
import { useState } from 'react';
import { ItineraryCommentsSection } from '../itinerary-comments-section';
import { ButtonViewMore } from '../button-view-more';
import { ItineraryActivitiesSection } from '../itinerary-activities-section';
import { useUpdateHeightContainer } from '../../hooks/useUpdateHeightContainer';
import { useHandleActiveItineraryChange } from '../../hooks/useHandleActiveItineraryChange';

interface ItineraryExtraProps {
  activeItineraryId: string;
  animationDuration?: number;
}

export const ItineraryExtra = ({
  activeItineraryId,
  animationDuration = 500,
}: ItineraryExtraProps) => {
  const [isItineraryExpanded, setIsItineraryExpanded] = useState(false);

  const { fetchData } = useHandleActiveItineraryChange(
    activeItineraryId,
    isItineraryExpanded,
    setIsItineraryExpanded,
    animationDuration
  );

  // Accion lanzada por el usuario cuando hace click en el boton de ver mas
  const handleButtonViewMore = () => {
    if (isItineraryExpanded) {
      // Evito hacer la peticion cuando el usuario toca el boton de ver mas y ya esta abierto, solo lo cierro
      setIsItineraryExpanded(false);
      return;
    }
    fetchData();
  };

  const { activitiesRef, commentsRef } =
    useUpdateHeightContainer(isItineraryExpanded);

  return (
    <>
      <ButtonViewMore
        show={isItineraryExpanded}
        handleShow={handleButtonViewMore}
        animationDuration={animationDuration}
      />

      <Collapse
        in={isItineraryExpanded}
        timeout={animationDuration}
        unmountOnExit
        mountOnEnter
      >
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
          <Grid item xs={12} lg={6}>
            <ItineraryActivitiesSection ref={activitiesRef} />
          </Grid>
          <Grid item xs={12} lg={6} boxShadow={2}>
            <ItineraryCommentsSection
              ref={commentsRef}
              itineraryId={activeItineraryId}
            />
          </Grid>
        </Grid>
      </Collapse>
    </>
  );
};

import { Collapse, Grid } from '@mui/material';
import { ItineraryCommentsSection } from '../itinerary-comments-section';
import { ButtonViewMore } from '../button-view-more';
import { ItineraryActivitiesSection } from '../itinerary-activities-section';
import { useUpdateHeightContainer } from '../../hooks/useUpdateHeightContainer';
import { useItineraryExpansion } from '../../hooks/useItineraryExpansion';
import { useAppDispatch } from '../../../../store/hooks';
import { fetchCommentsAndActivitiesByItineraryId } from '../../../../store/actions/itinerary-extra';

interface ItineraryExtraProps {
  activeItineraryId: string;
  animationDuration?: number;
}

export const ItineraryExtra = ({
  activeItineraryId,
  animationDuration = 500,
}: ItineraryExtraProps) => {
  const dispatch = useAppDispatch();
  const fecthCommentsAndActivities = () =>
    dispatch(
      fetchCommentsAndActivitiesByItineraryId(activeItineraryId)
    ).unwrap();

  const { isItineraryExpanded, handleButtonViewMore } = useItineraryExpansion(
    activeItineraryId,
    animationDuration,
    fecthCommentsAndActivities
  );
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

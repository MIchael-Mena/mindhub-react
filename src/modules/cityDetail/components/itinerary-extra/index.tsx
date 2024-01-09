import { Box, Collapse, Grid, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { ActivityCard } from '../activity-card';
import { Activity } from '../../../../models/Acitivity';
import { Comments } from '../comments';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { fetchCommentsAndActivitiesByItineraryId } from '../../../../store/slices/comments';
import { ButtonViewMore } from '../button-view-more';

export const ItineraryExtra = ({
  activeItineraryId,
}: {
  activeItineraryId: string;
}) => {
  const { loading, data } = useAppSelector(
    (store) => store.itinerarySelectedReducer
  );
  const dispatch = useAppDispatch();
  const activitiesRef = useRef<HTMLDivElement>(null);
  const commentsRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  const animationDuration = 500;

  const updateHeightContainer = () => {
    if (activitiesRef.current) {
      const activitiesHeight = activitiesRef.current.clientHeight;
      const commentsHeight = commentsRef.current!.clientHeight;
      if (activitiesHeight > 250 && commentsHeight > 250) {
        commentsRef.current!.style.maxHeight = activitiesHeight + 'px';
      }
    }
  };

  // Accion lanzada por el usuario cuando hace click en el boton de ver mas
  const handleShow = () => {
    dispatch(fetchCommentsAndActivitiesByItineraryId(activeItineraryId)).then(
      (_e) => {
        // Si hay un error, va a exister un objeto error pero no lo desestructuro porque typescript me dice que no existe
        // const hasError = meta.requestStatus === 'rejected' ? true : false; // fullfilled, pending, rejected
        // Halla o no un error debo mostrar el contenido aunque este vacio, se que el error no va a ser por conexion
        // ya que el componente padre se encarga de eso
        setShow(!show);
      }
    );
  };

  useEffect(() => {
    if (!show) return;
    setShow(false);
    // El timeout es para que se vea la animacion de salida
    setTimeout(() => {
      dispatch(fetchCommentsAndActivitiesByItineraryId(activeItineraryId)).then(
        (_e) => {
          setShow(true);
          // updateHeightContainer();
        }
      );
    }, animationDuration);
  }, [activeItineraryId]);

  useEffect(updateHeightContainer, [show]);

  return (
    <>
      <ButtonViewMore
        show={show}
        handleShow={handleShow}
        loading={loading}
        animationDuration={animationDuration}
      />

      <Collapse
        in={show}
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
          <Grid item xs={12} md={6}>
            <Typography
              variant="h5"
              p={2}
              bgcolor="secondary.main"
              color="white"
            >
              Activities
            </Typography>
            <Box ref={activitiesRef}>
              {data.activities.map((activity) => (
                <ActivityCard key={activity._id} {...activity} />
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={6} boxShadow={2}>
            <Typography variant="h5" p={2} bgcolor="secondary.main">
              Comments
            </Typography>
            <Comments ref={commentsRef} comments={data.comments} />
          </Grid>
        </Grid>
      </Collapse>
    </>
  );
};

const activities: Activity[] = [
  {
    _id: '1',
    _itinerary: '1',
    title: 'Activity 1',
    duration: 60,
    description: 'Description of Activity 1',
    images: ['image1.jpg', 'image2.jpg'],
  },
  {
    _id: '2',
    _itinerary: '1',
    title: 'Activity 2',
    duration: 60,
    description: 'Description of Activity 2',
    images: ['image1.jpg', 'image2.jpg'],
  },
  {
    _id: '3',
    _itinerary: '1',
    title: 'Activity 3',
    duration: 60,
    description: 'Description of Activity 3',
    images: ['image1.jpg', 'image2.jpg'],
  },
  {
    _id: '4',
    _itinerary: '1',
    title: 'Activity 4',
    duration: 60,
    description: 'Description of Activity 4',
    images: ['image1.jpg', 'image2.jpg'],
  },
  {
    _id: '5',
    _itinerary: '1',
    title: 'Activity 5',
    duration: 60,
    description: 'Description of Activity 5',
    images: ['image1.jpg', 'image2.jpg'],
  },
  /*   {
    _id: '6',
    _itinerary: '1',
    title: 'Activity 6',
    duration: 60,
    description: 'Description of Activity 6',
    images: ['image1.jpg', 'image2.jpg'],
  },
  {
    _id: '7',
    _itinerary: '1',
    title: 'Activity 7',
    duration: 60,
    description: 'Description of Activity 7',
    images: ['image1.jpg', 'image2.jpg'],
  },
  {
    _id: '8',
    _itinerary: '1',
    title: 'Activity 8',
    duration: 60,
    description: 'Description of Activity 8',
    images: ['image1.jpg', 'image2.jpg'],
  },
  {
    _id: '9',
    _itinerary: '1',
    title: 'Activity 9',
    duration: 60,
    description: 'Description of Activity 9',
    images: ['image1.jpg', 'image2.jpg'],
  },
  {
    _id: '10',
    _itinerary: '1',
    title: 'Activity 10',
    duration: 60,
    description: 'Description of Activity 10',
    images: ['image1.jpg', 'image2.jpg'],
  }, */
];

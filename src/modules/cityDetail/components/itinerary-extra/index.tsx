import { Collapse, Grid } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { Comments } from '../comments';
import { useAppDispatch } from '../../../../store/hooks';
import { ButtonViewMore } from '../button-view-more';
import { fetchCommentsAndActivitiesByItineraryId } from '../../../../store/actions/itinerary-extra';
import { Activities } from '../../activities';

export const ItineraryExtra = ({
  activeItineraryId,
}: {
  activeItineraryId: string;
}) => {
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

  const fetchData = () => {
    dispatch(fetchCommentsAndActivitiesByItineraryId(activeItineraryId)).then(
      (_e) => {
        // Si hay un error, va a exister un objeto error pero no lo desestructuro porque typescript me dice que no existe
        // const hasError = meta.requestStatus === 'rejected' ? true : false; // fullfilled, pending, rejected
        // Halla o no un error debo mostrar el contenido aunque este vacio, se que el error no va a ser por conexion
        // ya que el componente padre se encarga de eso
        setShow(true);
      }
    );
  };

  // Accion lanzada por el usuario cuando hace click en el boton de ver mas
  const handleShow = () => {
    if (show) {
      // Evito hacer la peticion cuando el usuario toca el boton de ver mas y ya esta abierto, solo lo cierro
      setShow(false);
      return;
    }
    fetchData();
  };

  // Accion lanzada cuando el usuario cambia el tab de itinerarios
  useEffect(() => {
    if (!show) return;
    setShow(false);
    // El timeout es para que se vea la animacion de salida
    setTimeout(() => {
      fetchData();
    }, animationDuration);
  }, [activeItineraryId]);

  useEffect(updateHeightContainer, [show]);

  return (
    <>
      <ButtonViewMore
        show={show}
        handleShow={handleShow}
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
            <Activities ref={activitiesRef} />
          </Grid>
          <Grid item xs={12} md={6} boxShadow={2}>
            <Comments
              ref={commentsRef}
              // comments={data.comments}
              itineraryId={activeItineraryId}
            />
          </Grid>
        </Grid>
      </Collapse>
    </>
  );
};

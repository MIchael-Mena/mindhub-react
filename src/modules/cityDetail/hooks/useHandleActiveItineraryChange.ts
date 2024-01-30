import { useEffect } from 'react';
import { fetchCommentsAndActivitiesByItineraryId } from '../../../store/actions/itinerary-extra';
import { useAppDispatch } from '../../../store/hooks';

/* 
  Hook personalizado para manejar el cambio de activeItineraryId,   
  Accion lanzada cuando el usuario cambia el tab de itinerarios.
*/
export const useHandleActiveItineraryChange = (
  activeItineraryId: string,
  show: boolean,
  setIsItineraryExpanded: (show: boolean) => void,
  animationDuration: number
) => {
  const dispatch = useAppDispatch();
  const fetchData = () => {
    // Se utiliza una promesa (then) porque la altura del contenedor se actualiza cuando se obtienen los datos
    // Si hay un error, va a exister un objeto error en _e pero no lo desestructuro porque typescript me dice que no existe
    // const hasError = meta.requestStatus === 'rejected' ? true : false; // fullfilled, pending, rejected
    dispatch(fetchCommentsAndActivitiesByItineraryId(activeItineraryId)).then(
      (_e) => setIsItineraryExpanded(true)
    );
  };

  useEffect(() => {
    if (!show) return;
    setIsItineraryExpanded(false);
    // El timeout es para que se vea la animacion de salida
    setTimeout(fetchData, animationDuration);
  }, [activeItineraryId]);

  return { fetchData };
};

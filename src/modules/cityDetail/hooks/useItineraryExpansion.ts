import { useEffect, useState } from 'react';
import { ItineraryExtraState } from '../../../models/ItineraryExtra';
import { handleSnackbar } from '../../../utils/apiUtils';

/* 
  Hook personalizado para manejar el cambio de activeItineraryId, que es el id del itinerario activo
  y la expansion de los itinerarios. Se encarga de hacer la peticion para obtener los comentarios y actividades
  de un itinerario y de manejar la expansion del mismo.
*/
export const useItineraryExpansion = (
  activeItineraryId: string,
  animationDuration: number,
  fetchCommentsAndActivities: () => Promise<ItineraryExtraState>
) => {
  const [isItineraryExpanded, setIsItineraryExpanded] = useState(false);

  const fetchData = () => {
    fetchCommentsAndActivities()
      .then((_e) => setIsItineraryExpanded(true))
      .catch(() =>
        handleSnackbar(
          'An error occurred while fetching the itinerary data, please try again later',
          'error'
        )
      );
  };

  // Accion lanzada por el usuario cuando hace click en el boton de ver mas
  const handleButtonViewMore = () => {
    if (isItineraryExpanded) {
      // Evito hacer la peticion cuando el usuario toca el boton de ver mas y ya esta abierto, solo lo cierro
      setIsItineraryExpanded(false);
      return;
    }
    fetchData();
  };

  // Accion lanzada cuando el usuario cambia el tab del itinerario activo. Si el itinerario esta expandido,
  // se cierra y se hace la peticion para obtener los datos del nuevo itinerario
  useEffect(() => {
    if (!isItineraryExpanded) return;
    setIsItineraryExpanded(false);
    // El timeout es para que se vea la animacion de salida
    setTimeout(fetchData, animationDuration);
  }, [activeItineraryId]);

  return { handleButtonViewMore, isItineraryExpanded };
};

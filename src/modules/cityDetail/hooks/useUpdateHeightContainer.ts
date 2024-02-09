import { Theme, useMediaQuery } from '@mui/material';
import { useEffect, useRef } from 'react';

/* 
  Hook personalizado para actualizar la altura del contenedor que contiene los comentarios
  y las actividades de la ciudad, asignando la altura del contenedor de actividades al contenedor
  de comentarios si la altura de este último es menor a 250px.
 */
export const useUpdateHeightContainer = (isItineraryExpanded: boolean) => {
  const isLargeScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up('lg')
  );
  const activitiesRef = useRef<HTMLDivElement>(null);
  const commentsRef = useRef<HTMLDivElement>(null);

  const updateHeightContainer = () => {
    if (activitiesRef.current && isLargeScreen) {
      const activitiesHeight = activitiesRef.current.clientHeight;
      if (activitiesHeight > 250) {
        commentsRef.current!.style.maxHeight = activitiesHeight + 'px';
      }
    }
  };

  useEffect(updateHeightContainer, [isItineraryExpanded]);
  return { activitiesRef, commentsRef };
};

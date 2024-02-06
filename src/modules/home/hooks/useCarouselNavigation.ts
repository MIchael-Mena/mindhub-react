import { useCallback, useRef } from 'react';
import { useAppDispatch } from '../../../store/hooks';

const useCarouselNavigation = (durationAnimation: number) => {
  const dispatch = useAppDispatch();
  const leftButton = useRef<HTMLButtonElement>(null);
  const rightButton = useRef<HTMLButtonElement>(null);
  // Uso use callback para tener siempre la misma referencia y que se elimine correctamente del listener
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      leftButton.current?.click();
    } else if (e.key === 'ArrowRight') {
      rightButton.current?.click();
    }
  }, []);

  const handleSlideChange = (
    current: number | undefined,
    _previous: number | undefined
  ) => {
    setTimeout(() => {
      dispatch({
        type: 'SET_CURRENT_SLIDE',
        payload: { currentSlide: current ? current + 1 : 1 },
      });
    }, durationAnimation);
  };
  return { leftButton, rightButton, handleKeyDown, handleSlideChange };
};

export default useCarouselNavigation;

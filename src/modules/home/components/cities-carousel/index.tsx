import { useTheme } from '@mui/material/styles';
import useStyles from '../../../../hooks/useStyles';
import { Box, Theme } from '@mui/material';
import { useCallback, useRef, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import NavigationButton from '../navigation-button';
import useIsInView from '../../../../hooks/useIsInView';
import useThrottledCallback from '../../../../hooks/useThrottledCallback';
import useEventListener from '../../../../hooks/useEventListener';
import './style.css';
import { useAppSelector } from '../../../../store/hooks';

interface CitiesCarouselProps {
  children: React.ReactNode;
  slide?: number;
}

/*   const handleKeyDown = (e: KeyboardEvent) => {
    if (!activeHover) return;
    if (e.key === 'ArrowLeft') {
      leftButton.current?.click();
    } else if (e.key === 'ArrowRight') {
      rightButton.current?.click();
    }
  }; */

export const CitiesCarousel = ({ children }: CitiesCarouselProps) => {
  const currentSlide = useAppSelector(
    (store) => store.citiesReducer.popularCities.currentSlide
  );
  console.log('currentSlide', currentSlide);
  const theme: Theme = useTheme();
  const myStyles = useStyles();
  // const [activeHover, setActiveHover] = useState(false);
  const leftButton = useRef<HTMLButtonElement>(null);
  const rightButton = useRef<HTMLButtonElement>(null);
  const timeAnimation = 500;

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
    previous: number | undefined
  ) => {
    console.log('current', current, 'previous', previous);
  };

  const handleThrottle = useThrottledCallback(timeAnimation);
  // useEventListener<KeyboardEvent>('keydown', handleKeyDown, [activeHover]);
  const [carouselRef, isInView] = useIsInView(0.5);
  return (
    <Box
      // onMouseEnter={() => setActiveHover(true)}
      // onMouseLeave={() => setActiveHover(false)}
      onMouseEnter={() =>
        window.addEventListener('keydown', handleKeyDown as EventListener)
      }
      onMouseLeave={() =>
        window.removeEventListener('keydown', handleKeyDown as EventListener)
      }
      tabIndex={1}
      className="carousel-container"
      sx={[
        {
          my: { xs: 2, sm: 6 },
          width: { xs: '100%', sm: '90%', md: '80%' },
        },
        myStyles.shadowBoxGreen,
      ]}
      ref={carouselRef}
    >
      <Carousel
        strictIndexing
        index={currentSlide - 1}
        onChange={handleSlideChange}
        height="700px"
        navButtonsAlwaysVisible
        duration={timeAnimation}
        animation="slide"
        autoPlay={isInView}
        stopAutoPlayOnHover
        NavButton={({ onClick, className, style, next, prev }) => {
          return (
            <>
              {next && (
                <NavigationButton
                  direction="next"
                  ref={rightButton}
                  onClick={(
                    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                  ) => handleThrottle(() => onClick(e))}
                  className={className}
                  style={style}
                />
              )}
              {prev && (
                <NavigationButton
                  direction="prev"
                  ref={leftButton}
                  onClick={(
                    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                  ) => handleThrottle(() => onClick(e))}
                  className={className}
                  style={style}
                />
              )}
            </>
          );
        }}
        navButtonsWrapperProps={{
          // Contenedor de los botones de navegación
          className: 'nav-buttons-wrapper',
        }}
        indicatorIconButtonProps={{
          style: {
            color: theme.palette.secondary.main,
          },
        }}
        activeIndicatorIconButtonProps={{
          style: {
            color: theme.palette.getContrastText(
              theme.palette.background.paper
            ),
          },
        }}
        indicatorContainerProps={{
          className: 'indicator-container',
          style: {
            backgroundColor: theme.palette.background.paper,
          },
        }}
      >
        {children}
      </Carousel>
    </Box>
  );
};

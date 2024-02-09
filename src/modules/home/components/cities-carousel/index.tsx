import useStyles from '../../../../hooks/useStyles';
import { Box } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import NavigationButton from '../navigation-button';
import useIsInView from '../../../../hooks/useIsInView';
import useThrottledCallback from '../../../../hooks/useThrottledCallback';
import { useAppSelector } from '../../../../store/hooks';
import useCarouselNavigation from '../../hooks/useCarouselNavigation';
import './style.css';

interface CitiesCarouselProps {
  children: React.ReactNode;
}

export const CitiesCarousel = ({ children }: CitiesCarouselProps) => {
  const lastSlide = useAppSelector(
    (store) => store.citiesReducer.carousel.lastSlide
  );
  const { shadowBoxGreen, theme } = useStyles();
  const [carouselRef, isInView] = useIsInView(0.5);
  const timeAnimation = isInView ? 500 : 0; // Para evitar un bug visual al volver a la pagina (retroceder en el navegador)

  const { leftButton, rightButton, handleKeyDown, handleSlideChange } =
    useCarouselNavigation(timeAnimation);
  const handleThrottle = useThrottledCallback(timeAnimation);
  return (
    <Box
      className="carousel-container"
      onMouseEnter={() =>
        window.addEventListener('keydown', handleKeyDown as EventListener)
      }
      onMouseLeave={() =>
        window.removeEventListener('keydown', handleKeyDown as EventListener)
      }
      tabIndex={1}
      sx={[
        {
          my: { xs: 2, sm: 6 },
          width: { xs: '100%', sm: '90%', md: '80%' },
        },
        shadowBoxGreen,
      ]}
      ref={carouselRef}
    >
      <Carousel
        strictIndexing
        index={lastSlide - 1}
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

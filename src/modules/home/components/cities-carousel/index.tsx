import { useTheme } from '@mui/material/styles';
import useStyles from '../../../../hooks/useStyles';
import { Box, Theme } from '@mui/material';
import { KeyboardEvent, useRef, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import NavigationButton from '../navigation-button';
import './style.css';
import { useThrottledEvent } from '../../../../hooks/useThrottledEvent';

interface CitiesCarouselProps {
  children: React.ReactNode;
}

export const CitiesCarousel = ({ children }: CitiesCarouselProps) => {
  const theme: Theme = useTheme();
  const myStyles = useStyles();
  const [activeHover, setActiveHover] = useState(false);
  const leftButton = useRef<HTMLButtonElement>(null);
  const rightButton = useRef<HTMLButtonElement>(null);
  const timeAnimation = 500;

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!activeHover) return;
    if (e.key === 'ArrowLeft') {
      leftButton.current?.click();
    } else if (e.key === 'ArrowRight') {
      rightButton.current?.click();
    }
  };

  useThrottledEvent<KeyboardEvent>('keydown', handleKeyDown, timeAnimation);
  return (
    <Box
      onMouseEnter={() => {
        if (!activeHover) setActiveHover(true);
      }}
      onMouseLeave={() => {
        if (activeHover) setActiveHover(false);
      }}
      tabIndex={1}
      sx={[
        {
          my: { xs: 2, sm: 6 },
          width: { xs: '100%', sm: '90%', md: '80%' },
          mx: 'auto',
          borderRadius: '25px 25px 0 0',
          overflow: 'hidden',
          transition: 'box-shadow 0.2s ease-in-out',
        },
        myStyles.shadowBoxGreen,
      ]}
    >
      <Carousel
        height={'700px'}
        navButtonsAlwaysVisible
        duration={timeAnimation}
        animation="slide"
        stopAutoPlayOnHover
        NavButton={({ onClick, className, style, next, prev }) => {
          return (
            <>
              {next && (
                <NavigationButton
                  direction="next"
                  ref={rightButton}
                  onClick={onClick}
                  className={className}
                  style={style}
                />
              )}
              {prev && (
                <NavigationButton
                  direction="prev"
                  ref={leftButton}
                  onClick={onClick}
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

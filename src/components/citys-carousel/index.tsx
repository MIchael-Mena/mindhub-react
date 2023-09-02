import Carousel from 'react-material-ui-carousel';
import PopularDestinations from '../popular-destinations';
import { Box, CircularProgress, Paper, Theme } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useDebouncedKeyDown from '../../hooks/useDebounceKeyDown';
import useStyles from '../../hooks/useStyles';
import { useEffect, useMemo, useRef, useState } from 'react';
// import { useApiService } from '../../hooks/useApiService';
// import { ApiService } from '../../services/api.service';
import { FailedRequest } from '../failed-request';
import NavigationButton from '../navigation-button';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchPopularCities } from '../../store/actions/cities';
import { chunkArray } from '../../utils/util';
import './CitysCarousel.css';

const CitysCarousel = () => {
  const theme: Theme = useTheme();
  const myStyles = useStyles();
  const [activeHover, setActiveHover] = useState(false);
  const leftButton = useRef<HTMLButtonElement>(null);
  const rightButton = useRef<HTMLButtonElement>(null);
  const timeAnimation = 500;

  const {
    data: popularCities,
    loading,
    error,
    hasBeenModified,
  } = useAppSelector((store) => store.citiesReducer.popularCities);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!hasBeenModified) dispatch(fetchPopularCities({ limit: 12 }));
  }, []);

  // const {
  //   data: popularCities,
  //   loading,
  //   error,
  // } = useApiService<City[]>(() =>
  //   ApiService.getData('/city', { limit: 12, sort: 'rating', order: 'desc' })
  // );

  const groupedCities = useMemo(() => {
    return chunkArray(popularCities, 4);
  }, [popularCities]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!activeHover) return;
    if (e.key === 'ArrowLeft') {
      leftButton.current?.click();
    } else if (e.key === 'ArrowRight') {
      rightButton.current?.click();
    }
  };

  // Debounceamos el evento keydown para que no se dispare muchas veces
  useDebouncedKeyDown('keydown', handleKeyDown, timeAnimation);

  return (
    <>
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
          autoPlay={false}
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
          {loading || error ? (
            <Paper
              sx={{ p: { xs: 1, sm: 4 } }}
              elevation={3}
              className="common-paper"
            >
              {loading ? (
                <CircularProgress size={'250px'} />
              ) : (
                <FailedRequest message="Opps! Something went wrong fetching popular cities." />
              )}
            </Paper>
          ) : (
            groupedCities.map((cities, i) => (
              <Paper
                sx={{ p: { xs: 1, sm: 4 } }}
                elevation={3}
                key={i}
                className="common-paper"
              >
                <PopularDestinations destinations={cities} />
              </Paper>
            ))
          )}
        </Carousel>
      </Box>
    </>
  );
};

export default CitysCarousel;

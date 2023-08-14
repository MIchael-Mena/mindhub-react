import Carousel from 'react-material-ui-carousel'
import PopularDestinations from '../popular-destinations'
import { items } from '../popular-destinations/destination-items'
import { Box, Button, Theme } from '@mui/material'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'
import { useTheme } from '@mui/material/styles'
import useDebouncedKeyDown from '../../hooks/useDebounceKeyDown'
import { useRef } from 'react'
import './CitysCarousel.css'

const CitysCarousel = () => {
  const theme: Theme = useTheme()
  const carousel = useRef<HTMLDivElement>(null)
  const leftButton = useRef<HTMLButtonElement>(null)
  const rightButton = useRef<HTMLButtonElement>(null)
  const timeAnimation = 500

  const handleKeyDown = (e: KeyboardEvent) => {
    if (carousel.current !== document.activeElement) return
    if (e.key === 'ArrowLeft') {
      leftButton.current?.click()
    } else if (e.key === 'ArrowRight') {
      rightButton.current?.click()
    }
  }

  useDebouncedKeyDown(handleKeyDown, timeAnimation, carousel)

  const nextButton = (
    onclick: Function,
    className: string,
    style: React.CSSProperties
  ) => {
    return (
      <Button
        ref={rightButton}
        variant="outlined"
        color="primary"
        onClick={(event) => onclick(event)}
        className={className}
        style={style}
      >
        Next
        <ArrowCircleRightIcon sx={{ ml: 1 }} />
      </Button>
    )
  }

  const prevButton = (
    onClick: Function,
    className: string,
    style: React.CSSProperties
  ) => {
    return (
      <Button
        ref={leftButton}
        variant="outlined"
        color="primary"
        onClick={(event) => onClick(event)}
        className={className}
        style={style}
      >
        <ArrowCircleLeftIcon sx={{ mr: 1 }} />
        Prev
      </Button>
    )
  }

  return (
    <>
      <Box
        tabIndex={1}
        ref={carousel}
        sx={{
          mb: 2,
          mx: 'auto',
          width: { xs: '100%', sm: '90%', md: '80%' },
          ':hover': {
            boxShadow: '0 0 2px 1px rgba(255, 255, 255, 0.8)',
          },
          borderRadius: '25px 25px 0 0',
          overflow: 'hidden',
          transition: 'box-shadow 0.3s ease-in-out',
        }}
      >
        <Carousel
          navButtonsAlwaysVisible
          duration={timeAnimation}
          animation="slide"
          stopAutoPlayOnHover
          NavButton={({ onClick, className, style, next, prev }) => {
            return (
              <>
                {next && nextButton(onClick, className, style)}
                {prev && prevButton(onClick, className, style)}
              </>
            )
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
          {items.map((item, i) => (
            <PopularDestinations key={i} destinations={item} />
          ))}
        </Carousel>
      </Box>
    </>
  )
}

export default CitysCarousel

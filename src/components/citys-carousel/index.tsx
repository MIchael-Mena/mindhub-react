import Carousel from 'react-material-ui-carousel'
import PopularDestinations from '../popular-destinations'
import { items } from '../popular-destinations/destination-items'
import { Button, Theme } from '@mui/material'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'
import { useTheme } from '@mui/material/styles'
import './CitysCarousel.css'

const CitysCarousel = () => {
  const theme: Theme = useTheme()
  return (
    <Carousel
      navButtonsAlwaysVisible
      autoPlay={false}
      sx={{ mb: 2, mx: 'auto', width: { xs: '100%', sm: '90%', md: '80%' } }}
      NavButton={({ onClick, className, style, next, prev }) => {
        return (
          <Button
            variant="outlined"
            color="primary"
            onClick={(event) => onClick(event)}
            className={className}
            style={style}
          >
            {next && (
              <>
                Next
                <ArrowCircleRightIcon sx={{ ml: 1 }} />
              </>
            )}
            {prev && (
              <>
                <ArrowCircleLeftIcon sx={{ mr: 1 }} />
                Prev
              </>
            )}
          </Button>
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
          color: theme.palette.getContrastText(theme.palette.background.paper),
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
  )
}

export default CitysCarousel

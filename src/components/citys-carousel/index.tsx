import Carousel from 'react-material-ui-carousel'
import PopularDestinations from '../popular-destinations'
import { items } from '../popular-destinations/destination-items'
import { Button } from '@mui/material'
// import HomeIcon from '@mui/icons-material/Home'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'
import './CitysCarousel.css'
import { useTheme } from '@emotion/react'

const CitysCarousel = () => {
  const theme = useTheme()
  // @ts-ignore - La propiedad palette si existe, pero no está tipada
  const color = theme.palette.background.paper

  return (
    <Carousel
      navButtonsAlwaysVisible
      sx={{ width: 'inherit', mb: 2 }}
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
        style: {
          margin: '0 3rem',
          bottom: '1%',
          top: 'unset',
          height: 'auto',
        },
      }}
      indicatorIconButtonProps={{
        style: {
          color: 'yellow',
        },
      }}
      activeIndicatorIconButtonProps={{
        style: {
          backgroundColor: '#fff',
        },
      }}
      indicatorContainerProps={{
        style: {
          textAlign: 'center',
          backgroundColor: color,
          padding: '1rem 0',
          margin: '0 ',
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

import Carousel from 'react-material-ui-carousel'
import PopularDestinations from '../popular-destinations'
import { items } from '../popular-destinations/destination-items'
import { Button } from '@mui/material'
import './CitysCarousel.css'

const CitysCarousel = () => {
  return (
    <Carousel
      navButtonsAlwaysVisible
      sx={{ width: 'inherit', mb: 2 }}
      NavButton={({ onClick, className, style, next, prev }) => {
        return (
          <Button
            onClick={(event) => onClick(event)}
            className={className}
            style={style}
          >
            {next && 'Next'}
            {prev && 'Previous'}
          </Button>
        )
      }}
      navButtonsWrapperProps={{
        // Contenedor de los botones de navegación
        style: {
          margin: '0 4rem',
          top: '93%',
          bottom: 'unset',
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
          backgroundColor: 'red',
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

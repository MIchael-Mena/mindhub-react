import Carousel from 'react-material-ui-carousel'
import PopularDestinations from '../popular-destinations'
import { items } from '../popular-destinations/destination-items'

const CitysCarousel = () => {
  return (
    <Carousel
      navButtonsAlwaysVisible
      sx={{ width: 'inherit', mb: 2 }}
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

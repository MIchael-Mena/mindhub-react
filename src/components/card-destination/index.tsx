import { useState } from 'react'
import { Destination } from '../../models/Destination'
import { Box, Button, Typography } from '@mui/material'
import './CardDestination.css'

const CardDestination = (destination: Destination) => {
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <Box
      className="card-destination"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={destination.image}
        alt="Imagen"
        className={`image-container ${isHovered ? 'image-hovered' : ''}`}
      />
      <Box
        className={`description-container ${
          isHovered ? 'description-hovered' : ''
        }`}
      >
        <Typography variant="body1">{destination.description}</Typography>
        <Button
          variant="outlined"
          color="success"
          sx={{
            borderRadius: '0',
            position: 'relative',
            mt: '2rem',
          }}
        >
          Explore
        </Button>
      </Box>
    </Box>
  )
}

export default CardDestination

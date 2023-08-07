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
      sx={{
        position: 'relative',
        width: '100%',
        height: '400px',
        overflow: 'hidden',
        cursor: 'pointer',
        borderRadius: '15px',
        boxShadow: '5px 5px 5px 1px rgba(0, 0, 0, 0.5)',
        transition: 'all 0.4s ease-in-out',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={destination.image}
        alt="Imagen"
        className={`image-container ${isHovered ? 'image-hovered' : ''}`}
      />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          padding: '2rem',
          right: isHovered ? 0 : '-100%', // Posición inicial del contenedor (fuera del área visible)
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'right 0.4s',
        }}
      >
        <Typography variant="body1">{destination.description}</Typography>
        <Button
          variant="contained"
          sx={{
            position: 'relative',
            mt: '2rem',
            backgroundColor: 'white',
            color: 'black',
            '&:hover': {
              backgroundColor: 'black',
              color: 'white',
            },
          }}
        >
          Explore
        </Button>
      </Box>
    </Box>
  )
}

export default CardDestination

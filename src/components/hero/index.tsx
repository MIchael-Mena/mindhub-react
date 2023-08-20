import { Box } from '@mui/material'
import { ReactNode } from 'react'

interface HeroProps {
  imageHero: string
  children: ReactNode
  // sizeImage debe ser un porcetanje de 0 a 100 ajustar de acuerdo a la relacion aspecto de la imagen
  sizeImage?: string
}

const Hero = ({ imageHero, children, sizeImage = '75%' }: HeroProps) => {
  const isValidSize = /^([0-9]{1,2}|100)%$/.test(sizeImage)
  const imageSize = isValidSize ? sizeImage : '75%'

  return (
    <>
      <Box
        component="section"
        sx={{
          position: 'relative',
          width: '100%',
          // height: '0', // Inicialmente, alto 0 para mostrar la imagen completa
          paddingBottom: imageSize, // Ratio de aspecto de la imagen (4:3)
          overflow: 'hidden',
          transition: 'all 0.3s ease-in-out',
        }}
      >
        <img
          src={imageHero}
          alt="Background"
          style={{
            // filter: 'brightness(0.5)',
            filter: 'blur(2px)',
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            backgroundColor: 'rgb(55, 48, 107, 0.8)',
            p: 2,
            borderRadius: 15,
            textAlign: 'center',
            width: '80%',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          {children}
        </Box>
      </Box>
    </>
  )
}

export default Hero

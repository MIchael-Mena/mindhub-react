import { Box } from '@mui/material';
import { ReactNode } from 'react';

interface HeroProps {
  imageHero: string;
  children: ReactNode;
  // size debe ser un porcetanje de 0 a 100 ajustar de acuerdo a la relacion aspecto de la imagen
  size: string;
}

const Hero = ({ imageHero, children, size = 'auto' }: HeroProps) => {
  // const isValidSize = /^([0-9]{1,2}|100)%$/.test(size); // Verificar si es un % valido
  // const imageSize = isValidSize ? size : 'auto';

  return (
    <>
      <Box
        component="section"
        sx={{
          position: 'relative',
          width: '100%',
          paddingBottom: size,
          // minHeight: height,
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
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
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
  );
};

export default Hero;

import { Box } from '@mui/material';
import { ReactNode, useState } from 'react';
import styles from './hero.module.scss';

interface HeroProps {
  imageHeroLowQuality?: string;
  imageHeroHighQuality: string;
  children: ReactNode;
  size?: string;
}

/*
  En el Box se utilizó padding-bottom para darle altura al contenedor. El valor de padding-bottom es 
  un porcentaje que se calcula con la relación de aspecto de la imagen. Por ejemplo si la imagen es 
  de 16:9, por lo que el valor de padding-bottom es 56.25%, que es el resultado de (9/16)*100. Se 
  prefirió este método en lugar de asignar una altura fija a la imagen, ya que se adapta a cualquier tamaño 
  de pantalla. 
  Al renderizar el componente, ya se tiene un espacio reservado para la imagen sin importar el tamaño de 
  la pantalla (breakpoints). Además, se puede usar el mismo componente para diferentes imágenes sin tener 
  que hacer ajustes manuales. Solo se debe ajustar el valor de padding-bottom de acuerdo a la 
  relación de aspecto de la imagen.  
*/
const Hero = ({
  imageHeroLowQuality,
  imageHeroHighQuality,
  children,
  size = 'auto',
}: HeroProps) => {
  const [isHighQualityImageLoaded, setIsHighQualityImageLoaded] =
    useState(false);

  return (
    <Box component="section" className={styles.container} paddingBottom={size}>
      {imageHeroLowQuality && (
        <img
          // loading="eager"
          src={imageHeroLowQuality}
          alt="Background"
          className={styles.image}
          style={{
            zIndex: 'auto',
            opacity: 'auto',
          }}
        />
      )}
      <img
        // loading="lazy"
        src={imageHeroHighQuality}
        alt="Background"
        className={styles.image}
        style={{
          zIndex: isHighQualityImageLoaded ? 'auto' : -1,
          opacity: isHighQualityImageLoaded ? 1 : 0,
        }}
        onLoad={() => setIsHighQualityImageLoaded(true)}
      />
      <Box className={styles.box} p={2} borderRadius={15}>
        {children}
      </Box>
    </Box>
  );
};

export default Hero;

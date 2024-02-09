import { useEffect, useState } from 'react';
import CardCity from '../card-city';
import { CardCitySkeleton } from '../card-city-skeleton';
import { CityBasic } from '../../../../models/CityBasic';

export const CardCityLoader = ({ city }: { city: CityBasic }) => {
  const [isImageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Se carga la imagen en memoria para que cuando se renderice el componente CardCity, la imagen ya este cargada
    // si el cache esta desactivado, la imagen se volvera a cargar dentro del componente CardCity (se pedira 2 veces)
    const img = new Image();
    img.src = city.images[0];
    img.onload = () => {
      setImageLoaded(true);
    };
  }, []);

  return <>{isImageLoaded ? <CardCity city={city} /> : <CardCitySkeleton />}</>;
};

import { Skeleton } from '@mui/material';
import { useState } from 'react';

interface ItineraryImgProps {
  cityName: string;
  images: string[];
  parentLoading: boolean;
}

export const ItineraryImg = ({
  images,
  cityName,
  parentLoading,
}: ItineraryImgProps) => {
  const [imageLoading, setImageLoading] = useState(true);
  const handleImageLoaded = () => {
    setImageLoading(false);
  };
  return (
    <>
      {(imageLoading || parentLoading) && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height="320px"
          sx={{
            borderRadius: 10,
            border: '1px solid #ccc',
            boxShadow: '5px 5px 5px 1px rgba(0, 0, 0, 0.3)',
          }}
        />
      )}
      {!parentLoading && (
        <img
          src={images[0]}
          alt={cityName}
          onLoad={handleImageLoaded}
          style={{
            display: imageLoading ? 'none' : 'block',
            maxWidth: '100%',
            height: 'auto',
            borderRadius: 10,
            border: '1px solid #ccc',
            boxShadow: '5px 5px 5px 1px rgba(0, 0, 0, 0.3)',
          }}
        />
      )}
    </>
  );
};

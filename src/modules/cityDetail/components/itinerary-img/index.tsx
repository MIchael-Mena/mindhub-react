import { Skeleton } from '@mui/material';
import { useState } from 'react';
import './itinerary-img.css';

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
          className="img-container"
        />
      )}
      {!parentLoading && (
        <div className="img-container">
          <img
            src={images[0]}
            alt={cityName}
            onLoad={handleImageLoaded}
            style={{
              display: imageLoading ? 'none' : 'block',
              maxWidth: '100%',
              minHeight: '320px',
              height: 'auto',
              objectFit: 'cover',
            }}
          />
          <span className="glow"></span>
        </div>
      )}
    </>
  );
};

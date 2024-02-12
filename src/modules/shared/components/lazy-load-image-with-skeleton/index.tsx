import { useState } from 'react';
import { Skeleton, SxProps, Theme } from '@mui/material';
import { useEffect } from 'react';
import useIsInView from '../../../../hooks/useIsInView';

interface LazyLoadImageWithSkeletonProps {
  src: string;
  alt: string;
  children: React.ReactNode;
  skeletonStyle?: SxProps<Theme>;
}

export const LazyLoadImageWithSkeleton = ({
  src,
  children,
  skeletonStyle,
}: LazyLoadImageWithSkeletonProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [ref, isInView] = useIsInView(0.1);

  useEffect(() => {
    if (isInView) {
      const img = new Image();
      img.src = src;
      if (img.complete) {
        // Si la imagen ya esta en cache, no se dispara el evento onload
        setImageLoaded(true);
      } else {
        img.onload = () => {
          setImageLoaded(true);
        };
        img.onerror = () => {
          setImageLoaded(true);
        };
      }
    }
  }, [src, isInView]);

  return (
    <>
      {!imageLoaded ? (
        <Skeleton
          ref={ref}
          variant="rectangular"
          animation="wave"
          sx={skeletonStyle}
        />
      ) : (
        children
      )}
    </>
  );
};

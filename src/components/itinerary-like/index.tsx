import { FavoriteBorderSharp, FavoriteSharp } from '@mui/icons-material';
import { IconButton, Tooltip, Typography } from '@mui/material';
import { useState } from 'react';

export const ItineraryLike = ({ likes }: { likes: number }) => {
  const [liked, setLiked] = useState(false);
  const handleLike = () => {
    setLiked(!liked);
  };

  return (
    <>
      <Tooltip title={liked ? 'Unlike' : 'Like'} placement="top" arrow>
        <IconButton aria-label="likes" onClick={handleLike}>
          {liked ? <FavoriteSharp /> : <FavoriteBorderSharp />}
        </IconButton>
      </Tooltip>
      <Typography variant="body1" textAlign="center">
        {liked ? likes + 1 : likes}
      </Typography>
    </>
  );
};

import { FavoriteBorderSharp, FavoriteSharp } from '@mui/icons-material';
import { IconButton, Tooltip, Typography } from '@mui/material';
// import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import {
  addFavouriteItinerary,
  removeFavouriteItinerary,
} from '../../../../store/actions/user';

export const ItineraryLike = ({
  likes,
  idItinerary,
}: {
  likes: number;
  idItinerary: string;
}) => {
  const dispatch = useAppDispatch();
  const { isLogged, user } = useAppSelector((state) => state.userReducer);

  const liked = isLogged
    ? user.favouriteItineraries!.includes(idItinerary)
    : false;

  // const [liked, setLiked] = useState(
  //   isLogged ? user.favouriteItineraries!.includes(idItinerary) : false
  // );
  // const handleLike = () => {
  //   setLiked(!liked);
  // };

  const handleLike = () => {
    if (liked) {
      dispatch(addFavouriteItinerary({ postId: idItinerary }));
    } else {
      dispatch(removeFavouriteItinerary({ postId: idItinerary }));
    }
  };

  const tooltipTitle = !isLogged
    ? 'You must be logged in to like'
    : liked
    ? 'Unlike'
    : 'Like';

  // Se agrego el span para que el tooltip no se muestre cuando el usuario no está logueado (disabled)
  return (
    <>
      <Tooltip title={tooltipTitle} placement="top" arrow>
        <span>
          <IconButton
            aria-label="likes"
            onClick={handleLike}
            disabled={!isLogged}
          >
            {liked ? <FavoriteSharp /> : <FavoriteBorderSharp />}
          </IconButton>
        </span>
      </Tooltip>
      <Typography variant="body1" textAlign="center">
        {liked ? likes + 1 : likes}
      </Typography>
    </>
  );
};

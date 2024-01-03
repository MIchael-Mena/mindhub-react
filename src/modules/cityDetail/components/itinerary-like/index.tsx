import { FavoriteBorderSharp, FavoriteSharp } from '@mui/icons-material';
import { IconButton, Tooltip, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import {
  addFavouriteItinerary,
  removeFavouriteItinerary,
} from '../../../../store/actions/user';
import { selectItemById } from './select-item-by-id';

export const ItineraryLike = ({ idItinerary }: { idItinerary: string }) => {
  const dispatch = useAppDispatch();
  const { isLogged, user } = useAppSelector((state) => state.userReducer);

  const { likes } = useAppSelector((state) =>
    selectItemById(state, idItinerary)
  );

  const liked = isLogged // Me dice si debo marcar el corazón como lleno o vacío
    ? user.favouriteItineraries!.includes(idItinerary)
    : false;

  const handleLike = () => {
    // El botón de like se puede clickear si el usuario está logueado
    if (!liked) {
      // !liked es el valor anterior
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
        {likes}
      </Typography>
    </>
  );
};

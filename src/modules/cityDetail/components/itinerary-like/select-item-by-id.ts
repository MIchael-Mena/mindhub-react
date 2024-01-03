import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../../store/store';

const selectLikes = (state: RootState) =>
  state.citySelectedReducer.itinerariesLikes;

const selectItemId = (_state: RootState, itemId: string) => itemId;

const selectItemById = createSelector(
  [selectLikes, selectItemId],
  (likes, itemId) =>
    likes.find((like) => like.id === itemId) ?? { likes: 0, id: itemId }
);

// Se utiliza create selector para evitar que se vuelva a ejecutar la funcion (find) si no cambia el
// state de itinerariesLikes. Ver documentacion: https://redux.js.org/usage/deriving-data-selectors

export { selectItemById };

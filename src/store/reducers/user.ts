import { createReducer } from '@reduxjs/toolkit';
import { User } from '../../models/User';
import {
  addFavouriteItinerary,
  authenticate,
  login,
  loginWithGoogle,
  logout,
  register,
  registerWithGoogle,
  removeFavouriteItinerary,
} from '../actions/user';
import { ApiResponse } from '../../models/ApiResponse';
import { Comment } from '../../models/Comment';

const defaultUser: User = {
  _id: '',
  firstName: '',
  lastName: '',
  email: '',
  profilePic: '',
  country: '',
  birthDate: '',
  comments: [] as Comment[],
  favouritesCities: [],
  favouriteActivities: [],
  favouriteItineraries: [],
};

const initialState: { user: User; isLogged: boolean } = {
  isLogged: false,
  user: defaultUser,
};

const handleSuccessfullAction = (
  state: {
    user: User;
    isLogged: boolean;
  },
  payload: ApiResponse<User>
) => {
  // Si el estado no cambio, devuelvo el estado anterior para evitar re-render
  if (payload.success) {
    return {
      isLogged: true,
      user: payload.data ?? defaultUser,
    };
  }
  return state;
};

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(login.fulfilled, (_state, action) =>
      handleSuccessfullAction(_state, action.payload)
    )
    .addCase(register.fulfilled, (_state, action) =>
      handleSuccessfullAction(_state, action.payload)
    )

    .addCase(authenticate.fulfilled, (_state, action) =>
      handleSuccessfullAction(_state, action.payload)
    )
    .addCase(authenticate.rejected, (_state, _action) => initialState)

    .addCase(logout.fulfilled, (_state, _action) => initialState)

    .addCase(registerWithGoogle.fulfilled, (_state, action) =>
      handleSuccessfullAction(_state, action.payload)
    )
    .addCase(loginWithGoogle.fulfilled, (_state, action) =>
      handleSuccessfullAction(_state, action.payload)
    )

    .addCase(addFavouriteItinerary.fulfilled, (state, action) => {
      if (action.payload.success) {
        return {
          ...state,
          user: {
            ...state.user,
            favouriteItineraries: [
              ...state.user.favouriteItineraries!,
              action.payload.data?.itineraryId!,
            ],
          },
        };
      }
      return state;
    })

    .addCase(removeFavouriteItinerary.fulfilled, (state, action) => {
      if (action.payload.success) {
        return {
          ...state,
          user: {
            ...state.user,
            favouriteItineraries: state.user.favouriteItineraries?.filter(
              (id) => id !== action.payload.data?.itineraryId
            ),
          },
        };
      }
      return state;
    });
});

export default userReducer;

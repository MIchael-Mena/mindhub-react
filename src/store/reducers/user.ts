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
  setAuthError,
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

interface UserState {
  user: User;
  isLogged: boolean;
  authError: boolean;
}

const initialState: UserState = {
  isLogged: false,
  user: defaultUser,
  authError: false,
};

const handleSuccessfullAction = (
  state: UserState,
  payload: ApiResponse<User>
) => {
  // Si el estado no cambio, devuelvo el estado anterior para evitar re-render
  return payload.success
    ? { authError: false, user: payload.data ?? defaultUser, isLogged: true }
    : state;
};

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setAuthError, (state, action) => {
      state.authError = action.payload;
    })

    .addCase(login.fulfilled, (state, action) =>
      handleSuccessfullAction(state, action.payload)
    )
    .addCase(register.fulfilled, (state, action) =>
      handleSuccessfullAction(state, action.payload)
    )

    /*     .addCase(
      authenticate.fulfilled,
      (state, action) =>
        action.payload.success
          ? {
              ...state,
              user: action.payload.data ?? defaultUser,
              isLogged: true,
            }
          : initialState
    ) */
    .addCase(authenticate.fulfilled, (_state, action) => {
      return {
        authError: false,
        user: action.payload.data ?? defaultUser,
        isLogged: true,
      };
    })
    .addCase(authenticate.rejected, (_state, _action) => initialState)

    .addCase(logout, (_state, _action) => initialState)

    .addCase(registerWithGoogle.fulfilled, (state, action) =>
      handleSuccessfullAction(state, action.payload)
    )
    .addCase(loginWithGoogle.fulfilled, (state, action) =>
      handleSuccessfullAction(state, action.payload)
    )

    .addCase(addFavouriteItinerary.fulfilled, (state, action) => {
      // version con immer
      if (action.payload.success) {
        state.user.favouriteItineraries!.push(
          action.payload.data?.itineraryId!
        );
      }

      // version sin immer
      /*       if (action.payload.success) {
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
      return state; */
    })

    .addCase(removeFavouriteItinerary.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.user.favouriteItineraries =
          state.user.favouriteItineraries?.filter(
            (id) => id !== action.payload.data?.itineraryId
          );
      }
      /*       if (action.payload.success) {
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
      return state; */
    });
});

export default userReducer;

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

const handleAuthenticationSuccess = (
  _state: UserState,
  payload: ApiResponse<User>
) => {
  return {
    authError: false,
    user: payload.data ?? defaultUser,
    isLogged: true,
  };
};

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setAuthError, (state, action) => {
      state.authError = action.payload;
    })

    .addCase(login.fulfilled, (state, action) =>
      handleAuthenticationSuccess(state, action.payload)
    )
    .addCase(register.fulfilled, (state, action) =>
      handleAuthenticationSuccess(state, action.payload)
    )

    .addCase(authenticate.fulfilled, (state, action) =>
      handleAuthenticationSuccess(state, action.payload)
    )
    .addCase(authenticate.rejected, (_state, _action) => initialState)

    .addCase(logout, (_state, _action) => initialState)

    .addCase(registerWithGoogle.fulfilled, (state, action) =>
      handleAuthenticationSuccess(state, action.payload)
    )
    .addCase(loginWithGoogle.fulfilled, (state, action) =>
      handleAuthenticationSuccess(state, action.payload)
    )

    .addCase(addFavouriteItinerary.fulfilled, (state, action) => {
      // version con immer
      state.user.favouriteItineraries!.push(action.payload.data?.itineraryId!);

      // version sin immer
      /*       return {
        ...state,
        user: {
          ...state.user,
          favouriteItineraries: [
            ...state.user.favouriteItineraries!,
            action.payload.data?.itineraryId!,
          ],
        },
      }; */
    })

    .addCase(removeFavouriteItinerary.fulfilled, (state, action) => {
      state.user.favouriteItineraries = state.user.favouriteItineraries?.filter(
        (id) => id !== action.payload.data?.itineraryId
      );
    });
});

export default userReducer;

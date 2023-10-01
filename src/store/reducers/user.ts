import { createReducer } from '@reduxjs/toolkit';
import { User } from '../../models/User';
import {
  authenticate,
  login,
  loginWithGoogle,
  logout,
  register,
  registerWithGoogle,
} from '../actions/user';
import { ApiResponse } from '../../models/ApiResponse';

const defaultUser: User = {
  _id: '',
  firstName: '',
  lastName: '',
  email: '',
  profilePic: '',
  country: '',
  birthDate: '',
  favouritesCities: [],
  favouriteActivities: [],
  favouriteItineraries: [],
};

const initialState: { user: User; isLogged: boolean } = {
  isLogged: false,
  user: defaultUser,
};

const handleSuccessfulAction = (
  state: {
    user: User;
    isLogged: boolean;
  },
  payload: ApiResponse<User>
) => {
  // // Si el estado no cambio, devuelvo el estado anterior para evitar re-render
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
      handleSuccessfulAction(_state, action.payload)
    )
    .addCase(register.fulfilled, (_state, action) =>
      handleSuccessfulAction(_state, action.payload)
    )
    .addCase(authenticate.fulfilled, (_state, action) =>
      handleSuccessfulAction(_state, action.payload)
    )
    .addCase(logout.fulfilled, (_state, _action) => initialState)

    .addCase(registerWithGoogle.fulfilled, (_state, action) =>
      handleSuccessfulAction(_state, action.payload)
    )
    .addCase(loginWithGoogle.fulfilled, (_state, action) =>
      handleSuccessfulAction(_state, action.payload)
    );
});

export default userReducer;

import { createReducer } from '@reduxjs/toolkit';
import { User } from '../../models/User';
import {
  authenticate,
  login,
  logout,
  register,
  registerFromGoogle,
} from '../actions/user';

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

const userState: { user: User; isLogged: boolean } = {
  isLogged: false,
  user: defaultUser,
};

const userReducer = createReducer(userState, (builder) => {
  builder
    .addCase(login.fulfilled, (_state, action) => {
      // // Si el estado no cambio, devuelvo el estado anterior para evitar re-render
      return action.payload.success
        ? {
            isLogged: true,
            user: action.payload.data ?? defaultUser,
          }
        : _state;
    })

    .addCase(register.fulfilled, (_state, action) => {
      return action.payload.success
        ? {
            isLogged: false,
            user: action.payload.data ?? defaultUser,
          }
        : _state;
    })

    .addCase(authenticate.fulfilled, (_state, action) => {
      return action.payload.success
        ? {
            isLogged: true,
            user: action.payload.data ?? defaultUser,
          }
        : _state;
    })

    .addCase(logout.fulfilled, (_state, _action) => {
      return {
        isLogged: false,
        user: defaultUser,
      };
    })

    .addCase(registerFromGoogle.fulfilled, (_state, action) => {
      return action.payload.success
        ? {
            isLogged: true,
            user: action.payload.data ?? defaultUser,
          }
        : _state;
    });
});

export default userReducer;

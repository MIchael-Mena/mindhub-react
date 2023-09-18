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
      return {
        isLogged: true,
        user: action.payload.data ?? defaultUser, // Tambien podria usar payload.success
      };
    })

    .addCase(register.fulfilled, (_state, action) => {
      return {
        isLogged: false,
        user: action.payload.data ?? defaultUser,
      };
    })

    .addCase(authenticate.fulfilled, (_state, action) => {
      // De esta forma typeScript no se queja de que action.payload no sea ApiResponse<User>
      // let user: User;
      // if (typeof action.payload === 'string') {
      //   if (action.payload === 'Unauthorized') user = defaultUser;
      // } else {
      //   user = action.payload.data!;
      // }
      return {
        isLogged: true,
        user:
          action.payload === 'Unauthorized'
            ? defaultUser
            : //@ts-ignore
              action.payload.data,
      };
    })

    .addCase(logout.fulfilled, (_state, _action) => {
      return {
        isLogged: false,
        user: defaultUser,
      };
    })

    .addCase(registerFromGoogle.fulfilled, (_state, action) => {
      const sucess = action.payload.success;
      return {
        isLogged: sucess,
        user: sucess ? action.payload.data! : defaultUser,
      };
    });
});

export default userReducer;

// const userState: { user: StatusResponse<User>; loggedIn: boolean } = {
//   loggedIn: false,
//   user: {
//     loading: true,
//     data: defaultUser,
//     error: null,
//   },
// };

// const userReducer = createReducer(userState, (builder) => {
//   builder
//     .addCase(login.fulfilled, (_state, action) => {
//       return {
//         loggedIn: true,
//         user: { data: action.payload.data!, loading: false, error: null },
//       };
//     })
//     .addCase(login.rejected, (state, action) => {
//       return {
//         loggedIn: false,
//         user: { data: state.user.data, loading: false, error: action.error },
//       };
//     })
//     .addCase(login.pending, (state) => {
//       return {
//         loggedIn: false,
//         user: { data: state.user.data, loading: true, error: null },
//       };
//     })

//     .addCase(register.fulfilled, (_state, action) => {
//       return {
//         loggedIn: true,
//         user: { data: action.payload!, loading: false, error: null },
//       };
//     })
//     .addCase(register.rejected, (state, action) => {
//       return {
//         loggedIn: false,
//         user: { data: state.user.data, loading: false, error: action.error },
//       };
//     })
//     .addCase(register.pending, (state) => {
//       return {
//         ...state,
//         user: { ...state.user, loading: true },
//       };
//     })

//     .addCase(authenticate.fulfilled, (_state, action) => {
//       return {
//         loggedIn: true,
//         user: { data: action.payload!, loading: false, error: null },
//       };
//     })
//     .addCase(authenticate.rejected, (state, action) => {
//       return {
//         loggedIn: false,
//         user: { data: state.user.data, loading: false, error: action.error },
//       };
//     })

//     .addCase(logout.fulfilled, (_state, _action) => {
//       return {
//         loggedIn: false,
//         user: { data: defaultUser, loading: false, error: null },
//       };
//     })
//     .addCase(logout.rejected, (state, action) => {
//       return {
//         loggedIn: false,
//         user: { data: state.user.data, loading: false, error: action.error },
//       };
//     })
//     .addCase(logout.pending, (state) => {
//       return {
//         loggedIn: false,
//         user: { data: state.user.data, loading: true, error: null },
//       };
//     });
// });

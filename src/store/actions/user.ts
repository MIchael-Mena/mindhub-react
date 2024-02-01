import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { LoginForm } from '../../models/LoginForm';
import { ApiService } from '../../services/api.service';
import { User } from '../../models/User';
import { AxiosError } from 'axios';
import { ApiResponse } from '../../models/ApiResponse';
import { AuthService } from '../../services/auth.service';

interface LikeResponse {
  totalLikes: number;
  itineraryId: string;
}

const setAuthError = createAction<boolean>('setAuthError');

/* const authenticate = createAsyncThunk('authenticate', async () => {
  if (localStorage.getItem('token') === null)
    return { success: false, message: 'Unauthorized' } as ApiResponse<User>; // Evita que se haga la peticion si no hay token
  try {
    const response = await ApiService.postData<User>('/user/authenticate');
    localStorage.setItem('token', response.token!);

    return response;
  } catch (error) {
    const res = (error as AxiosError).response!;
    const apiRes = res.data as ApiResponse<User>;
    localStorage.removeItem('token'); 
    enqueueSnackbar(apiRes.message, {
      variant: 'error',
    });
    return apiRes;
  }
}); */

const authenticate = createAsyncThunk<
  ApiResponse<User>,
  void,
  { rejectValue: ApiResponse<User> }
>('authenticate', async (_, { rejectWithValue }) => {
  try {
    const response = await AuthService.authenticate();
    return response;
  } catch (err: any) {
    const error: AxiosError<ApiResponse<User>> = err;
    return rejectWithValue(error.response?.data!);
  }
});

const login = createAsyncThunk<
  ApiResponse<User>,
  LoginForm,
  { rejectValue: ApiResponse<User> }
>('login', async (payload: LoginForm, { rejectWithValue }) => {
  try {
    const response = await AuthService.login(payload.email, payload.password);
    return response;
  } catch (error) {
    return rejectWithValue(
      (error as AxiosError).response?.data as ApiResponse<User>
    );
  }
});

/* const login = createAsyncThunk('login', async (payload: LoginForm) => {
  try {
    const response = await ApiService.postData<User>('/user/login', payload);

    localStorage.setItem('token', response.token!);

    return response;
  } catch (error) {
    // Si se devuelve un string o cualquier otro objeto, el estado de la promesa pasa a ser 'fulfilled'
    // y se puede obtener en el reducer con action.payload
    // Si se devuelve throw(error), el estado de la promesa pasa a ser 'rejected'
    // Pero si se hace en un componente dispatch(login()) y se hace un .then((res)=>)
    // el res.payload es undefined, en cambio con la primera opción es el string
    // return 'rejected';
    return (error as AxiosError).response?.data as ApiResponse<User>;
  }
}); */

/* const register = createAsyncThunk('register', async (payload: User) => {
  try {
    const response = await ApiService.postData<User>('/user/register', payload);
    return response;
  } catch (error) {
    return (error as AxiosError).response?.data as ApiResponse<User>;
  }
}); */

const register = createAsyncThunk<
  ApiResponse<User>,
  User,
  { rejectValue: ApiResponse<User> }
>('register', async (user: User, { rejectWithValue }) => {
  try {
    const response = await AuthService.register(user);
    return response;
  } catch (error) {
    return rejectWithValue(
      (error as AxiosError).response?.data as ApiResponse<User>
    );
  }
});

const logout = createAction('logout', () => {
  AuthService.logout();
  return { payload: null };
});

/* const registerWithGoogle = createAsyncThunk(
  'registerFromGoogle',
  async (payload: { code: string }) => {
    try {
      const response = await ApiService.postData<User>(
        '/user/register-google',
        payload
      );
      localStorage.setItem('token', response.token!);
      return response;
    } catch (error) {
      return (error as AxiosError).response?.data as ApiResponse<User>;
      // response.data es de Axios
    }
  }
); */

const registerWithGoogle = createAsyncThunk<
  ApiResponse<User>,
  string,
  { rejectValue: ApiResponse<User> }
>('registerFromGoogle', async (code: string, { rejectWithValue }) => {
  try {
    const response = await AuthService.registerWithGoogle(code);
    return response;
  } catch (error) {
    return rejectWithValue(
      (error as AxiosError).response?.data as ApiResponse<User>
    );
  }
});

const loginWithGoogle = createAsyncThunk<
  ApiResponse<User>,
  string,
  { rejectValue: ApiResponse<User> }
>('signInWithGoogle', async (code: string, { rejectWithValue }) => {
  try {
    const response = await AuthService.loginWithGoogle(code);
    return response;
  } catch (error) {
    return rejectWithValue(
      (error as AxiosError).response?.data as ApiResponse<User>
    );
  }
});

/* const loginWithGoogle = createAsyncThunk(
  'signInWithGoogle',
  async (payload: { code: string }) => {
    try {
      const response = await ApiService.postData<User>(
        '/user/login-google',
        payload
      );
      localStorage.setItem('token', response.token!);
      return response;
    } catch (error) {
      return (error as AxiosError).response?.data as ApiResponse<User>;
    }
  }
); */

const addFavouriteItinerary = createAsyncThunk(
  'addFavouriteItinerary',
  async (payload: { postId: string }) => {
    try {
      const response = await ApiService.postData<LikeResponse>(
        '/itinerary/like/' + payload.postId
      );
      return response;
    } catch (error) {
      return (error as AxiosError).response?.data as ApiResponse<LikeResponse>;
    }
  }
);

const removeFavouriteItinerary = createAsyncThunk(
  'removeFavouriteItinerary',
  async (payload: { postId: string }) => {
    try {
      const response = await ApiService.deleteData<LikeResponse>(
        '/itinerary/dislike/' + payload.postId
      );
      return response;
    } catch (error) {
      return (error as AxiosError).response?.data as ApiResponse<LikeResponse>;
    }
  }
);

export {
  setAuthError,
  authenticate,
  login,
  register,
  logout,
  registerWithGoogle,
  loginWithGoogle,
  addFavouriteItinerary,
  removeFavouriteItinerary,
};

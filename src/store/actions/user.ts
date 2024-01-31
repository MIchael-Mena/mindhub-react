import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { LoginForm } from '../../models/LoginForm';
import { ApiService } from '../../services/api.service';
import { User } from '../../models/User';
import { AxiosError } from 'axios';
import { ApiResponse } from '../../models/ApiResponse';
import { enqueueSnackbar } from 'notistack';

interface LikeResponse {
  totalLikes: number;
  itineraryId: string;
}

const setAuthError = createAction<boolean>('setAuthError');

const authenticate = createAsyncThunk('authenticate', async () => {
  if (localStorage.getItem('token') === null)
    return { success: false, message: 'Unauthorized' } as ApiResponse<User>; // Evita que se haga la peticion si no hay token
  try {
    const response = await ApiService.postData<User>('/user/authenticate');
    localStorage.setItem('token', response.token!);

    return response;
  } catch (error) {
    const res = (error as AxiosError).response!;
    const apiRes = res.data as ApiResponse<User>;
    // Si tengo un token invalido, el backend devuelve un error 401 en res.status y res.data sera 'Unauthorized'
    // TODO: Refactorizar el backend para que res.data devuelva un objeto del tipo ApiResponse
    localStorage.removeItem('token'); // Para cualquier error, se elimina el token
    enqueueSnackbar(apiRes.message, {
      variant: 'error',
    });
    return apiRes;
    /*     return {
      success: false,
      message: res.data ?? 'Unauthorized',
    } as ApiResponse<User>; // Se devuelve un objeto del tipo ApiResponse (no tendra data) */
  }
});

const login = createAsyncThunk('login', async (payload: LoginForm) => {
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
});

const register = createAsyncThunk('register', async (payload: User) => {
  try {
    const response = await ApiService.postData<User>('/user/register', payload);
    return response;
  } catch (error) {
    return (error as AxiosError).response?.data as ApiResponse<User>;
  }
});

const logout = createAsyncThunk('logout', async () => {
  const errorResponse = {
    success: false,
    message: 'Could not logout',
  } as ApiResponse<User>;
  try {
    // const token = localStorage.getItem('token');
    // if (!token) return Promise.resolve(errorResponse);

    const response = await ApiService.postData<User>('/user/logout');
    return response;
  } catch (error) {
    return errorResponse;
  } finally {
    // Se ejecuta siempre, tanto si hay error como si no
    localStorage.removeItem('token');
  }
});

const registerWithGoogle = createAsyncThunk(
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
);

const loginWithGoogle = createAsyncThunk(
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
);

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

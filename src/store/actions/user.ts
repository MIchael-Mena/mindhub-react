import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginForm } from '../../models/LoginForm';
import { ApiService } from '../../services/api.service';
import { User } from '../../models/User';
import { AxiosError } from 'axios';
import { ApiResponse } from '../../models/ApiResponse';

const options = (token: string) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const authenticate = createAsyncThunk(
  'authenticate',
  async (payload: string) => {
    try {
      const response = await ApiService.postData<User>(
        '/user/authenticate',
        {},
        options(payload)
      );
      localStorage.setItem('token', response.token!);

      return response;
    } catch (error) {
      const res = (error as AxiosError).response!;
      // res.data contendra 'Unauthorized' para cualquier error del token y res.status sera 401
      // TODO: Refactorizar el backend para que res.data devuelva un objeto del tipo ApiResponse
      localStorage.removeItem('token'); // Para cualquier error, se elimina el token
      return {
        success: false,
        message: res.data,
      } as ApiResponse<User>;
    }
  }
);

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
    message: 'Error al cerrar sesión',
  } as ApiResponse<User>;
  try {
    const token = localStorage.getItem('token');
    if (!token) return Promise.resolve(errorResponse);

    const response = await ApiService.postData<User>(
      '/user/logout',
      {},
      options(token)
    );
    return response;
  } catch (error) {
    return errorResponse;
  } finally {
    // Se ejecuta siempre, tanto si hay error como si no
    localStorage.removeItem('token');
  }
});

const registerFromGoogle = createAsyncThunk(
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

export { authenticate, login, register, logout, registerFromGoogle };

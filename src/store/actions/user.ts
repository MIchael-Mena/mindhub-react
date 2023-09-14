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
      if ((error as AxiosError).response?.status === 401) {
        localStorage.removeItem('token');
      }
      // response contendra 'Unauthorized' para cualquier error del token
      // Refactorizar el backend para que devuelva un objeto como ApiResponse
      return (error as AxiosError).response?.data as string;
    }
  }
);

const login = createAsyncThunk('login', async (payload: LoginForm) => {
  try {
    const response = await ApiService.postData<User>('/user/login', payload);

    localStorage.setItem('token', response.token!);

    return response;
  } catch (error) {
    // Si se devuelve un string, el estado de la promesa pasa a ser 'fulfilled'
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
  try {
    const token = localStorage.getItem('token');
    if (!token) return Promise.resolve('Unauthorized');
    const response = await ApiService.postData<User>(
      '/user/logout',
      {},
      options(token)
    );
    localStorage.removeItem('token');
    return response;
  } catch (error) {
    // response contendra 'Unauthorized' para cualquier error del token
    localStorage.removeItem('token');
    return (error as AxiosError).response?.data as string;
  }
});

export { authenticate, login, register, logout };

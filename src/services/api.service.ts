import axios, { AxiosError, AxiosInstance } from 'axios';
import { ApiResponse } from '../models/ApiResponse';
import { setAuthError } from '../store/actions/user';
import { Action } from '@reduxjs/toolkit';

export class ApiService {
  protected static baseUrl: string = 'http://localhost:5000/api';
  protected static instanceAxios: AxiosInstance = axios.create({
    baseURL: this.baseUrl,
    timeout: 2000,
  });
  /*   private static auth = (token: string) => {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }; */
  protected static dispatch: (action: Action) => void;

  static initialize(dispatch: (action: Action) => void) {
    this.dispatch = dispatch;
    // Interceptor de respuesta, no lo hago en el constructor porque necesito usar el dispatch
    this.instanceAxios.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          this.dispatch(setAuthError(true));
          const apiRes: ApiResponse<undefined> = {
            success: false,
            message: 'The session has expired, please log in again',
            timestamp: new Date().toISOString(),
          };
          error.response.data = apiRes;
        }
        return Promise.reject(error);
      }
    );
    // TODO: se probo el interceptor en el constructor y no funciono, el token no se agregaba a las peticiones
    // Interceptor de solicitud para agregar el token
    this.instanceAxios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  constructor() {}

  static async getData<T>(
    endPoint: string,
    queryParams: { [key: string]: string | number | boolean } = {}
  ): Promise<T> {
    try {
      // const token = localStorage.getItem('token');
      const response = await this.instanceAxios.get<ApiResponse<T>>(endPoint, {
        params: queryParams,
        // ...(token ? this.auth(token) : {}),
      });
      return response.data.data!;
    } catch (error) {
      throw error;
    }
  }

  static async postData<T>(
    endPoint: string,
    body: Object = {}
  ): Promise<ApiResponse<T>> {
    try {
      // const token = localStorage.getItem('token');
      const response = await this.instanceAxios.post<ApiResponse<T>>(
        endPoint,
        body
        // token ? this.auth(token) : {}
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static patchData<T>(
    endPoint: string,
    body: Object = {}
  ): Promise<ApiResponse<T>> {
    return this.instanceAxios
      .patch<ApiResponse<T>>(endPoint, body)
      .then((r) => {
        return r.data;
      });
  }

  static async deleteData<T>(endPoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await this.instanceAxios.delete<ApiResponse<T>>(
        endPoint
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

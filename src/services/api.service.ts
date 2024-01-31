import axios, { AxiosError, AxiosInstance } from 'axios';
import { ApiResponse } from '../models/ApiResponse';
import { setAuthError } from '../store/actions/user';
import { Action } from '@reduxjs/toolkit';

export class ApiService {
  private static baseUrl: string = 'http://localhost:5000/api';
  private static instanceAxios: AxiosInstance = axios.create({
    baseURL: this.baseUrl,
    timeout: 2000,
  });
  private static auth = (token: string) => {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };
  private static dispatch: (action: Action) => void;

  static initialize(dispatch: (action: Action) => void) {
    this.dispatch = dispatch;
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
  }

  constructor() {}

  static async getData<T>(
    endPoint: string,
    queryParams: { [key: string]: string | number | boolean } = {}
  ): Promise<T> {
    try {
      const token = localStorage.getItem('token'); // si hay token esta logueado
      const response = await this.instanceAxios.get<ApiResponse<T>>(endPoint, {
        params: queryParams,
        ...(token ? this.auth(token) : {}),
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
      const token = localStorage.getItem('token');
      const response = await this.instanceAxios.post<ApiResponse<T>>(
        endPoint,
        body,
        token ? this.auth(token) : {}
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
    const token = localStorage.getItem('token');
    return this.instanceAxios
      .patch<ApiResponse<T>>(endPoint, body, token ? this.auth(token) : {})
      .then((r) => {
        return r.data;
      });
  }

  static async deleteData<T>(endPoint: string): Promise<ApiResponse<T>> {
    try {
      const token = localStorage.getItem('token');
      const response = await this.instanceAxios.delete<ApiResponse<T>>(
        endPoint,
        token ? this.auth(token) : {}
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

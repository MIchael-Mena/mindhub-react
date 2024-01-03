import axios, { AxiosInstance } from 'axios';
import { ApiResponse } from '../models/ApiResponse';

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

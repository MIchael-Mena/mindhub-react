import axios, { AxiosInstance } from 'axios';
import { ApiResponse } from '../models/ApiResponse';

export class ApiService {
  private static baseUrl: string = 'http://localhost:5000/api';
  private static instanceAxios: AxiosInstance = axios.create({
    baseURL: this.baseUrl,
    timeout: 2000,
  });

  constructor() {}

  static async getData<T>(
    endPoint: string,
    queryParams: { [key: string]: string | number | boolean } = {}
  ): Promise<T> {
    try {
      const response = await this.instanceAxios.get<ApiResponse<T>>(endPoint, {
        params: queryParams,
      });
      return response.data.data!;
    } catch (error) {
      throw error;
    }
  }

  static async postData<T>(
    endPoint: string,
    body: Object = {},
    options: Object = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.instanceAxios.post<ApiResponse<T>>(
        endPoint,
        body,
        options
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async deleteData<T>(
    endPoint: string,
    options: Object = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.instanceAxios.delete<ApiResponse<T>>(
        endPoint,
        options
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

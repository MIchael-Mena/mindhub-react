import axios, { AxiosError, AxiosInstance } from 'axios';
import { User } from '../models/User';
import { ApiResponse } from '../models/ApiResponse';

export class AuthService {
  private static baseUrl: string = 'http://localhost:5000/api';
  private static instanceAxios: AxiosInstance = axios.create({
    baseURL: this.baseUrl,
    timeout: 2000,
  });

  constructor() {}

  public static async login(
    email: string,
    password: string
  ): Promise<ApiResponse<User>> {
    try {
      const response = await this.instanceAxios.post<ApiResponse<User>>(
        '/auth/login',
        {
          email,
          password,
        }
      );
      localStorage.setItem('token', response.data.token!);
      return response.data;
    } catch (error) {
      return (error as AxiosError).response!.data as ApiResponse<User>;
    }
  }

  public static async register(user: User): Promise<ApiResponse<User>> {
    try {
      const response = await this.instanceAxios.post<ApiResponse<User>>(
        '/auth/register',
        user
      );
      return response.data;
    } catch (error) {
      return (error as AxiosError).response!.data as ApiResponse<User>;
    }
  }
}

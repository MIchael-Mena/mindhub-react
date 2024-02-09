import { User } from '../models/User';
import { ApiResponse } from '../models/ApiResponse';
import { ApiService } from './api.service';

export class AuthService extends ApiService {
  private static authEndpoint: string = '/auth';

  constructor() {
    super();
  }

  public static async login(
    email: string,
    password: string
  ): Promise<ApiResponse<User>> {
    try {
      const response = await this.instanceAxios.post<ApiResponse<User>>(
        this.authEndpoint + '/login',
        {
          email,
          password,
        }
      );
      localStorage.setItem('token', response.data.token!);
      return response.data;
    } catch (error) {
      // return (error as AxiosError).response!.data as ApiResponse<User>;
      throw error;
    }
  }

  public static async register(user: User): Promise<ApiResponse<User>> {
    try {
      const response = await this.instanceAxios.post<ApiResponse<User>>(
        this.authEndpoint + '/register',
        user
      );
      localStorage.setItem('token', response.data.token!);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public static async loginWithGoogle(
    code: string
  ): Promise<ApiResponse<User>> {
    try {
      const response = await this.instanceAxios.post<ApiResponse<User>>(
        this.authEndpoint + '/login-google',
        { code }
      );
      localStorage.setItem('token', response.data.token!);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public static async registerWithGoogle(
    code: string
  ): Promise<ApiResponse<User>> {
    try {
      const response = await this.instanceAxios.post<ApiResponse<User>>(
        this.authEndpoint + '/register-google',
        { code }
      );
      localStorage.setItem('token', response.data.token!);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public static logout() {
    localStorage.removeItem('token');
  }

  public static async authenticate(): Promise<ApiResponse<User>> {
    try {
      const response = await this.instanceAxios.post<ApiResponse<User>>(
        this.authEndpoint + '/authenticate'
      );
      localStorage.setItem('token', response.data.token!);
      return response.data;
    } catch (error) {
      localStorage.removeItem('token');
      throw error;
    }
  }
}

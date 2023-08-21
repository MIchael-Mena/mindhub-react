import axios, { AxiosInstance } from 'axios';

export class ApiService {
  private static baseUrl: string = 'http://localhost:5000/api';
  private static instanceAxios: AxiosInstance = axios.create({
    baseURL: this.baseUrl,
    timeout: 2000,
  });

  constructor() {}

  static async getData<T>(
    uri: string,
    queryParams: { [key: string]: string | number } = {}
  ): Promise<T> {
    try {
      const response = await this.instanceAxios.get(uri, {
        params: queryParams,
      });
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }
}

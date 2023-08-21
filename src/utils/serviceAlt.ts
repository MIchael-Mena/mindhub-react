import axios, { AxiosInstance } from 'axios';

export class ApiServiceAlt<T> {
  private baseUrl: string = 'http://localhost:5000/api';
  private instanceAxios: AxiosInstance;

  constructor() {
    this.instanceAxios = axios.create({
      baseURL: this.baseUrl,
      timeout: 1000,
    });
    this.getData = this.getData.bind(this);
    this.updateData = this.updateData.bind(this);
  }

  // QueryParams: Record<string, any>
  async getData(
    uri: string,
    queryParams: { [key: string]: string | number },
    target: T
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

  async updateData(
    uri: string,
    queryParams: { [key: string]: string | number } = {},
    target: T
  ): Promise<T> {
    try {
      const response = await this.instanceAxios.put(uri, target);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }
}

// ---------------------------------------------------------------------------------------------

import { useEffect, useState } from 'react';

interface GetDataResponse<T> {
  data: T;
  loading: boolean;
  error: any | null;
}

// Caso de uso:   const {data: cities,loading, error} = useApiService<City[]>('getData', '/cities')
export const useApiServiceAlt = <T>(
  crudMethod: keyof ApiServiceAlt<T>,
  uri: string,
  queryParams: { [key: string]: string | number } = {},
  target: T = {} as T
) => {
  const [state, setState] = useState<GetDataResponse<T>>({
    loading: true,
    data: [] as T,
    error: null,
  });

  useEffect(() => {
    const apiService = new ApiServiceAlt<T>();
    runApiService(apiService[crudMethod]);
    return () => {
      // cleanup
      setState({
        loading: true,
        data: [] as T,
        error: null,
      });
    };
  }, []);

  const runApiService = async (
    crudMethod: (
      uri: string,
      queryParams: { [key: string]: string | number },
      data: T
    ) => Promise<T>
  ) => {
    try {
      const data = await crudMethod(uri, queryParams, target);
      setState({
        data: data,
        error: null,
        loading: false,
      });
    } catch (error) {
      setState({
        data: [] as T,
        error: error,
        loading: false,
      });
    }
  };

  return state;
};

import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { ApiResponse } from '../models/ApiResponse';

export interface GetDataResponse<T> {
  data: T;
  loading: boolean;
  error: any | null;
}

const useGetData = <T>(url: string) => {
  const [state, setState] = useState<GetDataResponse<T>>({
    loading: true,
    data: [] as T,
    error: null,
  });

  useEffect(() => {
    getData();
    return () => {
      // cleanup
      setState({
        loading: true,
        data: [] as T,
        error: null,
      });
    };
  }, []);

  const getData = async () => {
    try {
      const res: AxiosResponse<ApiResponse<T>> = await axios.get(url, {
        timeout: 3000,
      });
      setState({
        data: res.data.data,
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
  // return [state.data, state.loading, state.error] as const
};

// caso de uso
// const { data: cityData, loading, error } = useGetData<City>("url_del_api");

export default useGetData;

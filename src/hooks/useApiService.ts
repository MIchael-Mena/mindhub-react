import { useEffect, useState } from 'react';

interface GetDataResponse<T> {
  data: T;
  loading: boolean;
  error: any | null;
}

// const {data: cities,loading, error} = useApiService<City[]>(() => ApiService.getData<City[]>('/cities'));
export const useApiService = <T>(
  crudMethod: () => Promise<T>,
  listenTo: React.DependencyList = []
) => {
  const [state, setState] = useState<GetDataResponse<T>>({
    loading: true,
    data: [] as T,
    error: null,
  });

  useEffect(() => {
    runApiService(crudMethod);
    return () => {
      // cleanup
      setState({
        loading: true,
        data: [] as T,
        error: null,
      });
    };
  }, listenTo);

  const runApiService = async (crudMethod: () => Promise<T>) => {
    try {
      const data = await crudMethod();
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

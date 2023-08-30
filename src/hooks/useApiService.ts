import { useEffect, useState } from 'react';

interface GetDataResponse<T> {
  data: T;
  loading: boolean;
  error: any | null;
}

// Ejemplo de uso:
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

  // La primera vez que se ejecuta el hook, se ejecuta el crudMethod y devuelve el estado inicial,
  // despues de resolverse la promesa de crudMethod se actualiza el estado y se vuelve a renderizar el componente
  return state;
};

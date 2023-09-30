import { useEffect, useRef, useState } from 'react';
import { StatusResponse } from '../models/StatusResponse';

// Ejemplo de uso:
// const {data: cities,loading, error} = useApiService<City[]>(() => ApiService.getData<City[]>('/cities'));
/* @param crudMethod: funcion que devuelve una promesa con el resultado de la llamada a la api
 * @param listenTo: array de dependencias que se pasan al useEffect, por defecto es un array vacio
 * @param initialSkipFirstExecution: booleano que indica si se quiere saltar la primera ejecucion del hook, por defecto es false
 * @returns: objeto con el estado de la llamada a la api
 */
export const useApiService = <T>(
  crudMethod: () => Promise<T>,
  listenTo: React.DependencyList = [],
  initialSkipFirstExecution: boolean = false
) => {
  const skipFirstExecutionRef = useRef(initialSkipFirstExecution);
  const [state, setState] = useState<StatusResponse<T>>({
    // Si se quiere saltar la primera ejecucion, se pone el loading a false
    loading: !initialSkipFirstExecution,
    data: [] as T,
    error: null,
  });

  useEffect(() => {
    if (skipFirstExecutionRef.current) {
      skipFirstExecutionRef.current = false;
      return;
    }
    if (initialSkipFirstExecution) setState({ ...state, loading: true });

    runApiService(crudMethod);
    return () => {
      // cleanup, se ejecuta cuando se desmonta el componente o cuando cambia el estado de listenTo
      setState({
        loading: !initialSkipFirstExecution,
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
        error: error as Error, // Revisar si es necesario el casting
        loading: false,
      });
    }
  };

  // La primera vez que se ejecuta el hook, se ejecuta el crudMethod y devuelve el estado inicial,
  // despues de resolverse la promesa de crudMethod se actualiza el estado y se vuelve a renderizar el componente
  return state;
};

import { useEffect } from 'react';
/*
Este hook permite registrar un listener para un evento específico en el objeto global 'window'.
 */
const useEventListener = <T extends Event>(
  eventType: string,
  handleEvent: (e: T) => void,
  dependencies: React.DependencyList = []
) => {
  const callback = useCallback(handleEvent, dependencies);

  useEffect(() => {
    window.addEventListener(eventType, callback as EventListener);

    // Limpia el listener cuando el componente se desmonta
    return () => {
      window.removeEventListener(eventType, callback as EventListener);
    };
  }, [eventType, callback]);
};

export default useEventListener;

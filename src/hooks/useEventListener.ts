import { useEffect } from 'react';
/*
Este hook permite registrar un listener para un evento específico en el objeto global 'window'.
 */
const useEventListener = <T extends Event>(
  eventType: string,
  handleEvent: (e: T) => void,
  dependencies: React.DependencyList = []
) => {
  useEffect(() => {
    window.addEventListener(eventType, handleEvent as EventListener);

    // Limpia el listener cuando el componente se desmonta
    return () => {
      window.removeEventListener(eventType, handleEvent as EventListener);
    };
  }, dependencies);
};

export default useEventListener;

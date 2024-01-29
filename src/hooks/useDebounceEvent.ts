import { RefObject, useEffect, useRef } from 'react';

/*
Este hook aplica 'debouncing' a una función de devolución de llamada asociada a un evento específico. 
El 'debouncing' asegura que la función no se ejecute hasta que haya pasado un cierto intervalo de tiempo 
desde la última vez que se disparó el evento. Esto es útil para eventos que pueden dispararse con alta 
frecuencia y donde solo nos interesa la última invocación dentro de un intervalo de tiempo, como en la 
búsqueda en tiempo real o el redimensionamiento de la ventana.
 */
const useDebouncedEvent = <T>(
  eventType: string,
  callback: (e: T) => void,
  delay: number,
  element: RefObject<HTMLElement> | null = null
) => {
  const debouncedCallbackRef = useRef<number | undefined>();

  useEffect(() => {
    const handleEvent = (e: T) => {
      if (debouncedCallbackRef.current) {
        clearTimeout(debouncedCallbackRef.current);
      }

      debouncedCallbackRef.current = window.setTimeout(() => {
        callback(e);
        debouncedCallbackRef.current = undefined;
      }, delay);
    };

    const targetElement = element?.current || document;

    targetElement.addEventListener(eventType, handleEvent as EventListener);

    return () => {
      targetElement.removeEventListener(
        eventType,
        handleEvent as EventListener
      );
      if (debouncedCallbackRef.current) {
        clearTimeout(debouncedCallbackRef.current);
      }
    };
  }, [eventType, callback, delay, element]);
};

export default useDebouncedEvent;

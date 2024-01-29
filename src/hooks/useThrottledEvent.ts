import { useEffect, useRef } from 'react';

/*
Este hook aplica 'throttling' a una función de devolución de llamada asociada a un evento específico. 
El 'throttling' limita la frecuencia de ejecución de la función a un intervalo de tiempo definido. 
Si se dispara el evento más rápido que este intervalo, las invocaciones adicionales se ignoran. 
Esto es útil para eventos que pueden dispararse con alta frecuencia, como 'scroll' o 'resize'.
 */
export const useThrottledEvent = <T>(
  eventType: string,
  callback: (e: T) => void,
  delay: number,
  element: React.RefObject<HTMLElement> | null = null
) => {
  const lastCallTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const handleEvent = (e: T) => {
      const now = Date.now();
      if (lastCallTimeRef.current && now - lastCallTimeRef.current < delay) {
        return;
      }
      lastCallTimeRef.current = now;
      callback(e);
    };

    const targetElement = element?.current || document;

    targetElement.addEventListener(eventType, handleEvent as EventListener);

    return () => {
      targetElement.removeEventListener(
        eventType,
        handleEvent as EventListener
      );
    };
  }, [eventType, callback, delay, element]);
};

import { useRef } from 'react';

const useThrottledCallback = (duration: number) => {
  const lastExecution = useRef<number>(Date.now());

  const throttledCallback = (callbackToThrottle: Function) => {
    if (Date.now() - lastExecution.current >= duration) {
      callbackToThrottle();
      lastExecution.current = Date.now();
    }
  };

  return throttledCallback;
};

export default useThrottledCallback;

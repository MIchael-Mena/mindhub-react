import { useEffect, useRef, useState } from 'react';

/* 
Hook para detectar si un elemento está en el viewport
@param threshold - Umbral de visibilidad del elemento
 */
const useIsInView = (
  threshold = 0.5
): [React.MutableRefObject<any>, boolean] => {
  const [isInView, setIsInView] = useState<boolean>(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  return [ref, isInView];
};

export default useIsInView;

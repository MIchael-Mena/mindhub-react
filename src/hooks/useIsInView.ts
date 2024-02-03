import { useEffect, useRef, useState } from 'react';

export const useIsInView = (
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

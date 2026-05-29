import { useState, useEffect, useRef } from 'react';

export function useInView(ref, options = { threshold: 0.1 }) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true);
    }, options);

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, options]);

  return inView;
}
import { useRef } from 'react';
import { useInView } from '../../hooks/useInView';

export function FadeIn({ children, delay = 0, style = {} }) {
  const ref = useRef();
  const inView = useInView(ref);

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
import { useEffect, useRef, useState } from 'react';

/**
 * Diz se o elemento está visível na tela (IntersectionObserver).
 * Com `once: true`, depois que aparece uma vez continua `true` (bom para animações de entrada).
 *
 * const [ref, inView] = useInView({ threshold: 0.3, once: true });
 * <div ref={ref}>...</div>
 */
export function useInView({ threshold = 0, rootMargin = '0px', once = false } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!('IntersectionObserver' in window)) {
      setInView(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, inView];
}

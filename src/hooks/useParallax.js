import { useEffect } from 'react';
import { useReducedMotion } from './useReducedMotion.js';

/**
 * Parallax leve: cada filho com data-parallax="0.1" se desloca na vertical
 * proporcionalmente à distância entre o centro da seção e o centro da tela.
 *
 * Atualiza a variável CSS --py direto no DOM (sem setState), porque rodar
 * re-render do React a cada frame de scroll seria desperdício.
 */
export function useParallax(sectionRef, maxDelta = 600) {
  const reduced = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reduced) return;

    const items = [...section.querySelectorAll('[data-parallax]')];
    if (!items.length) return;

    let visible = false;
    let ticking = false;

    const update = () => {
      ticking = false;
      const rect = section.getBoundingClientRect();
      const raw = rect.top + rect.height / 2 - window.innerHeight / 2;
      const delta = Math.max(-maxDelta, Math.min(maxDelta, raw));
      items.forEach((el) => {
        const speed = parseFloat(el.dataset.parallax) || 0;
        el.style.setProperty('--py', `${(delta * speed).toFixed(1)}px`);
      });
    };

    const onScroll = () => {
      if (!visible || ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) update();
    });
    io.observe(section);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      items.forEach((el) => el.style.removeProperty('--py'));
    };
  }, [sectionRef, reduced, maxDelta]);
}

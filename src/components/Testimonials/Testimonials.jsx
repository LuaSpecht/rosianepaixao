import { useEffect, useRef, useState } from 'react';
import { testimonials } from '../../data/content.js';
import { useInView } from '../../hooks/useInView.js';
import { useParallax } from '../../hooks/useParallax.js';
import { useReducedMotion } from '../../hooks/useReducedMotion.js';
import './Testimonials.css';

const INTERVAL = 7000;

// Swatches de maquiagem decorativos (data-parallax = velocidade relativa ao scroll)
const SWATCHES = [
  { className: 'swatch--a', src: '/images/swatch-base.svg', speed: -0.12 },
  { className: 'swatch--b', src: '/images/swatch-batom.svg', speed: 0.1 },
  { className: 'swatch--c', src: '/images/swatch-blush.svg', speed: -0.06 },
];

export default function Testimonials() {
  const sectionRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inViewRef, inView] = useInView({ threshold: 0 });
  const reduced = useReducedMotion();

  useParallax(sectionRef);

  // troca automática: pausa quando a pessoa está lendo (hover/foco) ou fora da tela
  useEffect(() => {
    if (reduced || paused || !inView || testimonials.length < 2) return;
    const timer = setInterval(() => setCurrent((c) => (c + 1) % testimonials.length), INTERVAL);
    return () => clearInterval(timer);
  }, [reduced, paused, inView, current]);

  // o mesmo elemento precisa de dois refs (parallax + visibilidade)
  const setRefs = (el) => {
    sectionRef.current = el;
    inViewRef.current = el;
  };

  return (
    <section
      ref={setRefs}
      className="section testimonials"
      id="depoimentos"
      aria-labelledby="depo-titulo"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {SWATCHES.map((s) => (
        <img key={s.src} className={`swatch ${s.className}`} src={s.src} alt="" data-parallax={s.speed} />
      ))}

      <div className="container testimonials-inner">
        <h2 className="section-title" id="depo-titulo">
          Palavras de quem viveu o grande dia
        </h2>

        <div className="quotes">
          {testimonials.map((t, i) => (
            <figure className={`quote ${i === current ? 'is-active' : ''}`} key={i} aria-hidden={i !== current}>
              <blockquote>
                <p>{t.text}</p>
              </blockquote>
              <figcaption>{t.author}</figcaption>
            </figure>
          ))}
        </div>

        {testimonials.length > 1 && (
          <div className="quotes-nav" role="tablist" aria-label="Escolher depoimento">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === current}
                aria-label={`Depoimento ${i + 1} de ${testimonials.length}`}
                onClick={() => setCurrent(i)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

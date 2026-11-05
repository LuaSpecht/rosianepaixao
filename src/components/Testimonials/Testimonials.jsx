import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { testimonials } from '../../data/content.js';
import { useInView } from '../../hooks/useInView.js';
import { useParallax } from '../../hooks/useParallax.js';
import { useReducedMotion } from '../../hooks/useReducedMotion.js';
import Icon from '../Icon/Icon.jsx';
import './Testimonials.css';

// Tempo na tela proporcional ao tamanho do texto (dá tempo de ler os longos)
const MIN_TIME = 7000;
const MAX_TIME = 25000;
const MS_PER_CHAR = 45;
const LONG_TEXT = 320; // a partir daqui a letra diminui um pouco
const VISIBLE_DOTS = 3; // pontinhos visíveis; eles acompanham o depoimento atual

/** Aceita texto único ou lista de parágrafos. */
const toParagraphs = (text) => (Array.isArray(text) ? text : [text]);
const textLength = (text) => toParagraphs(text).join(' ').length;
const readingTime = (text) =>
  Math.min(MAX_TIME, Math.max(MIN_TIME, textLength(text) * MS_PER_CHAR));

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
    const timer = setTimeout(
      () => setCurrent((c) => (c + 1) % testimonials.length),
      readingTime(testimonials[current].text),
    );
    return () => clearTimeout(timer);
  }, [reduced, paused, inView, current]);

  // A caixa dos depoimentos acompanha a altura do que está na tela (com transição no CSS),
  // assim os curtos não deixam um buraco antes dos pontinhos.
  const quoteRefs = useRef([]);
  const [height, setHeight] = useState();
  useLayoutEffect(() => {
    const el = quoteRefs.current[current];
    if (!el) return;
    const update = () => setHeight(el.offsetHeight);
    update();
    const observer = new ResizeObserver(update); // fonte carregando, giro da tela etc.
    observer.observe(el);
    return () => observer.disconnect();
  }, [current]);

  // Janela de 3 pontinhos ao redor do atual (no começo e no fim, encosta na ponta)
  const total = testimonials.length;
  const firstDot = Math.min(Math.max(current - 1, 0), Math.max(total - VISIBLE_DOTS, 0));
  const dots = Array.from({ length: Math.min(VISIBLE_DOTS, total) }, (_, k) => firstDot + k);

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

        <div className="quotes" style={height ? { height } : undefined}>
          {testimonials.map((t, i) => (
            <figure
              className={`quote ${i === current ? 'is-active' : ''} ${textLength(t.text) > LONG_TEXT ? 'is-long' : ''}`}
              key={i}
              ref={(el) => (quoteRefs.current[i] = el)}
              aria-hidden={i !== current}
            >
              <blockquote>
                {toParagraphs(t.text).map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </blockquote>
              <figcaption>
                <span className="quote-author">{t.author}</span>
                {t.date && <span className="quote-date">{t.date}</span>}
              </figcaption>
            </figure>
          ))}
        </div>

        {testimonials.length > 1 && (
          <div className="quotes-nav" role="group" aria-label="Navegar pelos depoimentos">
            <button
              type="button"
              className="quotes-arrow"
              aria-label="Depoimento anterior"
              onClick={() => setCurrent((c) => (c - 1 + total) % total)}
            >
              <Icon name="chevron-left" />
            </button>

            {dots.map((i) => (
              <button
                key={i}
                type="button"
                className="quotes-dot"
                aria-current={i === current ? 'true' : undefined}
                aria-label={`Depoimento ${i + 1} de ${total}`}
                onClick={() => setCurrent(i)}
              />
            ))}

            <button
              type="button"
              className="quotes-arrow"
              aria-label="Próximo depoimento"
              onClick={() => setCurrent((c) => (c + 1) % total)}
            >
              <Icon name="chevron-right" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

import { useInView } from '../../hooks/useInView.js';
import { useReducedMotion } from '../../hooks/useReducedMotion.js';
import './Arch.css';

/**
 * Moldura em arco (espelho de camarim) — motivo visual do site.
 *
 * A revelação (contorno desenhado + foto subindo como véu) acontece:
 * - quando `revealed` é passado: no momento que o pai decidir (ex.: hero, após a foto carregar)
 * - senão: quando o arco entra na tela
 */
export default function Arch({ revealed, className = '', children }) {
  const [ref, inView] = useInView({ threshold: 0.3, once: true });
  const reduced = useReducedMotion();
  const isRevealed = reduced || (revealed ?? inView);

  return (
    <div ref={ref} className={`arch ${isRevealed ? 'is-revealed' : ''} ${className}`} data-arch>
      <svg className="arch-outline" viewBox="0 0 500 700" preserveAspectRatio="none" aria-hidden="true">
        <path
          pathLength="1"
          vectorEffect="non-scaling-stroke"
          d="M1 699 V250 A249 249 0 0 1 499 250 V699"
        />
      </svg>
      <div className="arch-frame">{children}</div>
    </div>
  );
}

/** Espaço reservado enquanto a foto definitiva não chega. */
export function PhotoPlaceholder({ title, note }) {
  return (
    <div className="photo-placeholder" role="img" aria-label={`Espaço para: ${title}`}>
      <span>{title}</span>
      {note && <small>{note}</small>}
    </div>
  );
}

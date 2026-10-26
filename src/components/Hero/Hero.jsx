import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import Arch from '../Arch/Arch.jsx';
import './Hero.css';

const TITLE_LINES = ['Sua história,', 'sua essência,', 'sua beleza.'];

/**
 * Abertura do site. Um único momento orquestrado: assim que a foto carrega,
 * o título sobe linha a linha, o arco é desenhado e a foto aparece como um véu.
 */
export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    // a imagem pode já estar em cache (load disparou antes do React montar)
    if (imgRef.current?.complete) {
      requestAnimationFrame(() => setLoaded(true));
      return;
    }
    const fallback = setTimeout(() => setLoaded(true), 1500); // nunca deixa o hero escondido
    return () => clearTimeout(fallback);
  }, []);

  return (
    <section className={`hero ${loaded ? 'is-loaded' : ''}`} id="inicio">
      <div className="container hero-grid">
        <div className="hero-text">
          <p className="hero-kicker">Maquiagem e penteado para noivas</p>
          <h1 className="hero-title">
            {TITLE_LINES.map((line) => (
              <span className="line" key={line}>
                <span>{line}</span>
              </span>
            ))}
          </h1>
          <p className="hero-lead">
            Um cuidado especial para você viver cada instante do seu grande dia.
          </p>
          <div className="hero-actions">
            <Link className="btn" to="/contato">
              Conversar com a Rosiane
            </Link>
            <Link className="text-link" to="/noivas">
              Ver noivas reais
            </Link>
          </div>
        </div>

        <figure className="hero-media">
          <Arch revealed={loaded}>
            <img
              ref={imgRef}
              src="/images/penteado-1.jpeg"
              alt="Noiva de costas no camarim, com penteado semipreso e cachos longos e soltos"
              width="1079"
              height="1262"
              fetchPriority="high"
              onLoad={() => setLoaded(true)}
              onError={() => setLoaded(true)}
            />
          </Arch>
        </figure>
      </div>
    </section>
  );
}

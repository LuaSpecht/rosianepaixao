import { useEffect, useRef, useState } from 'react';
import { config, instagramUrl } from '../../config.js';
import { useInstagramFeed } from '../../hooks/useInstagramFeed.js';
import Icon from '../Icon/Icon.jsx';
import PostModal from '../PostModal/PostModal.jsx';
import GalleryTile from './GalleryTile.jsx';
import './Gallery.css';

const PAGE_SIZE = config.galleryPageSize;

export default function Gallery() {
  const { status, items, profile } = useInstagramFeed();
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [openIndex, setOpenIndex] = useState(null);

  // Ao clicar em "Ver mais", o foco vai para a primeira foto nova (acessibilidade)
  const tileRefs = useRef([]);
  const focusIndex = useRef(null);
  useEffect(() => {
    if (focusIndex.current !== null) {
      tileRefs.current[focusIndex.current]?.focus();
      focusIndex.current = null;
    }
  }, [visibleCount]);

  const showMore = () => {
    focusIndex.current = visibleCount;
    setVisibleCount((n) => n + PAGE_SIZE);
  };

  const username = profile?.username ?? config.instagram;
  const visibleItems = items.slice(0, visibleCount);

  return (
    <section className="section gallery" id="galeria" aria-labelledby="galeria-titulo">
      <div className="container">
        <div className="gallery-head">
          <div>
            <h1 className="section-title" id="galeria-titulo">
              Noivas reais
            </h1>
            <p className="section-intro">Os registros mais recentes do Instagram da Rosiane.</p>
          </div>
          <a className="instagram-handle" href={instagramUrl} target="_blank" rel="noopener">
            <Icon name="instagram" />
            <span>@{username}</span>
          </a>
        </div>

        <div className="gallery-grid" aria-live="polite" aria-busy={status === 'loading'}>
          {status === 'loading' &&
            Array.from({ length: PAGE_SIZE }, (_, i) => (
              <div key={i} className="tile tile--skeleton" aria-hidden="true" />
            ))}

          {status === 'error' && (
            <p className="gallery-empty">
              As fotos não carregaram agora. Veja todas as noivas no{' '}
              <a href={instagramUrl} target="_blank" rel="noopener">
                Instagram da Rosiane
              </a>
              .
            </p>
          )}

          {status === 'ready' &&
            visibleItems.map((item, i) => (
              <GalleryTile
                key={item.id}
                ref={(el) => (tileRefs.current[i] = el)}
                item={item}
                onOpen={() => setOpenIndex(i)}
              />
            ))}
        </div>

        {status === 'loading' && (
          // reserva o espaço do botão enquanto carrega, para a página não "pular"
          // (importante quando alguém chega por /noivas#depoimentos)
          <div className="gallery-footer" aria-hidden="true">
            <span className="btn btn--outline" style={{ visibility: 'hidden' }}>
              Ver mais fotos
            </span>
          </div>
        )}
        {status === 'ready' && visibleCount < items.length && (
          <div className="gallery-footer">
            <button className="btn btn--outline" type="button" onClick={showMore}>
              Ver mais fotos
            </button>
          </div>
        )}
      </div>

      <PostModal
        items={items}
        index={openIndex}
        profile={profile}
        onNavigate={setOpenIndex}
        onClose={() => setOpenIndex(null)}
      />
    </section>
  );
}

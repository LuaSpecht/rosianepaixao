import { useEffect, useRef, useState } from 'react';
import { config } from '../../config.js';
import Icon from '../Icon/Icon.jsx';
import './PostModal.css';

const dateFormat = new Intl.DateTimeFormat('pt-BR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});
const numberFormat = new Intl.NumberFormat('pt-BR');
const plural = (n, one, many) => `${numberFormat.format(n)} ${n === 1 ? one : many}`;

/**
 * Lightbox do post (estilo Instagram): carrossel de mídias + legenda.
 * Usa <dialog> nativo: prende o foco, fecha com Esc e é acessível por padrão.
 *
 * Controlado pelo pai: `index` (null = fechado), `onNavigate(novoIndex)`, `onClose()`.
 */
export default function PostModal({ items, index, profile, onNavigate, onClose }) {
  const dialogRef = useRef(null);
  const slidesRef = useRef(null);
  const returnFocusRef = useRef(null);
  const swipeRef = useRef(null);
  const [slide, setSlide] = useState(0);

  const isOpen = index !== null;
  const item = isOpen ? items[index] : null;
  const total = item?.media.length ?? 0;

  // Abre/fecha o <dialog> conforme o estado do pai
  useEffect(() => {
    const dialog = dialogRef.current;
    if (isOpen && !dialog.open) {
      returnFocusRef.current = document.activeElement;
      dialog.showModal();
      document.body.style.overflow = 'hidden';
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  // Esc / dialog.close() disparam o evento "close": avisa o pai e devolve o foco
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  useEffect(() => {
    const dialog = dialogRef.current;
    const handleClose = () => {
      document.body.style.overflow = '';
      returnFocusRef.current?.focus?.();
      onCloseRef.current();
    };
    dialog.addEventListener('close', handleClose);
    return () => dialog.removeEventListener('close', handleClose);
  }, []);

  // Trocar de post volta para a primeira foto
  useEffect(() => setSlide(0), [index]);

  // Só o vídeo visível toca
  useEffect(() => {
    slidesRef.current?.querySelectorAll('video').forEach((video) => {
      if (Number(video.dataset.slide) === slide && isOpen) video.play().catch(() => {});
      else video.pause();
    });
  }, [slide, index, isOpen]);

  const goSlide = (delta) => {
    const next = slide + delta;
    if (next < 0 || next >= total) return false;
    setSlide(next);
    return true;
  };

  const goPost = (delta) => {
    const next = index + delta;
    if (next >= 0 && next < items.length) onNavigate(next);
  };

  // setas: primeiro passam as fotos do carrossel, depois os posts
  const onKeyDown = (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const dir = e.key === 'ArrowRight' ? 1 : -1;
    if (!goSlide(dir)) goPost(dir);
  };

  // swipe no celular
  const onPointerDown = (e) => {
    swipeRef.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = (e) => {
    const start = swipeRef.current;
    swipeRef.current = null;
    if (!start) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return;
    const dir = dx < 0 ? 1 : -1;
    if (!goSlide(dir)) goPost(dir);
  };

  const stats = [];
  if (Number.isFinite(item?.likes)) stats.push(plural(item.likes, 'curtida', 'curtidas'));
  if (Number.isFinite(item?.comments)) stats.push(plural(item.comments, 'comentário', 'comentários'));

  return (
    <dialog
      ref={dialogRef}
      className="post-modal"
      aria-label="Post do Instagram"
      onKeyDown={onKeyDown}
      // clique no fundo escuro (fora do conteúdo) fecha
      onClick={(e) => e.target === dialogRef.current && dialogRef.current.close()}
    >
      {item && (
        <>
          <button className="modal-close" type="button" aria-label="Fechar" onClick={() => dialogRef.current.close()}>
            <Icon name="close" />
          </button>
          <button
            className="modal-step modal-step--prev"
            type="button"
            aria-label="Post anterior"
            disabled={index === 0}
            onClick={() => goPost(-1)}
          >
            <Icon name="chevron-left" />
          </button>
          <button
            className="modal-step modal-step--next"
            type="button"
            aria-label="Próximo post"
            disabled={index === items.length - 1}
            onClick={() => goPost(1)}
          >
            <Icon name="chevron-right" />
          </button>

          <div className="post">
            <div className="post-media" onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
              <div
                ref={slidesRef}
                className="post-slides"
                style={{ transform: `translateX(-${slide * 100}%)` }}
              >
                {item.media.map((media, i) => (
                  <div
                    className="post-slide"
                    key={`${item.id}-${i}`}
                    aria-label={total > 1 ? `Mídia ${i + 1} de ${total}` : undefined}
                    aria-hidden={i !== slide}
                  >
                    {media.type === 'VIDEO' && media.url ? (
                      <video
                        data-slide={i}
                        src={media.url}
                        poster={media.thumb ?? undefined}
                        controls
                        playsInline
                        muted
                        loop
                        preload="metadata"
                      />
                    ) : (
                      <img src={media.url || media.thumb} alt="" decoding="async" />
                    )}
                  </div>
                ))}
              </div>

              {total > 1 && slide > 0 && (
                <button className="slide-btn slide-btn--prev" type="button" aria-label="Foto anterior" onClick={() => goSlide(-1)}>
                  <Icon name="chevron-left" />
                </button>
              )}
              {total > 1 && slide < total - 1 && (
                <button className="slide-btn slide-btn--next" type="button" aria-label="Próxima foto" onClick={() => goSlide(1)}>
                  <Icon name="chevron-right" />
                </button>
              )}
              {total > 1 && (
                <div className="slide-dots">
                  {item.media.map((_, i) => (
                    <span key={i} className={i === slide ? 'is-active' : ''} />
                  ))}
                </div>
              )}
            </div>

            <aside className="post-info">
              <header className="post-author">
                <img
                  className="post-avatar"
                  src={profile?.picture || '/images/avatar.svg'}
                  alt=""
                  width="44"
                  height="44"
                />
                <div>
                  <p className="post-username">{profile?.username ?? config.instagram}</p>
                  {item.timestamp && (
                    <p className="post-date">{dateFormat.format(new Date(item.timestamp))}</p>
                  )}
                </div>
              </header>

              {item.caption && (
                // key: volta a rolagem da legenda para o topo ao trocar de post
                <div className="post-caption" key={item.id}>
                  {item.caption}
                </div>
              )}

              <footer className="post-meta">
                {stats.length > 0 && (
                  <p className="post-stats">
                    {stats.map((s) => (
                      <span key={s}>{s}</span>
                    ))}
                  </p>
                )}
                <a className="text-link" href={item.permalink || '#'} target="_blank" rel="noopener">
                  Ver no Instagram
                </a>
              </footer>
            </aside>
          </div>
        </>
      )}
    </dialog>
  );
}

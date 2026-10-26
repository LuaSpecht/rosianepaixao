import Icon from '../Icon/Icon.jsx';
import { excerpt } from '../../utils/text.js';

const BADGE = {
  VIDEO: { icon: 'video', label: 'vídeo' },
  CAROUSEL_ALBUM: { icon: 'carousel', label: 'várias fotos' },
};

/** Uma foto da grade. No React 19, `ref` chega como prop normal. */
export default function GalleryTile({ item, onOpen, ref }) {
  const badge = BADGE[item.type];
  const description = excerpt(item.caption) || 'Noiva preparada pela Rosiane';

  return (
    <button
      ref={ref}
      type="button"
      className="tile is-new"
      onClick={onOpen}
      aria-label={`Abrir post${badge ? ` (${badge.label})` : ''}: ${description}`}
    >
      <img src={item.thumb} alt="" loading="lazy" decoding="async" />
      {badge && <Icon name={badge.icon} className="tile-badge" />}
    </button>
  );
}

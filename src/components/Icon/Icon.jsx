const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

const ICONS = {
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" {...stroke} strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4.2" {...stroke} strokeWidth="1.6" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" />
    </>
  ),
  whatsapp: (
    <path
      fill="currentColor"
      d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.2h.01c5.46 0 9.91-4.45 9.91-9.91A9.85 9.85 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24a8.2 8.2 0 0 1 8.24 8.25c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.44.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.13-.56-1.35-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.21.88 2.39 1 2.56.12.16 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.22-.16-.47-.28Z"
    />
  ),
  close: <path d="M5 5l14 14M19 5L5 19" {...stroke} strokeWidth="1.5" />,
  'chevron-left': <path d="M15 4l-8 8 8 8" {...stroke} strokeWidth="1.5" />,
  'chevron-right': <path d="M9 4l8 8-8 8" {...stroke} strokeWidth="1.5" />,
  video: <path fill="currentColor" d="M8 5.5v13l10.5-6.5L8 5.5Z" />,
  carousel: (
    <>
      <rect x="7" y="3" width="14" height="14" rx="2" fill="currentColor" />
      <path d="M4 7v11a2 2 0 0 0 2 2h11" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </>
  ),
};

/** Ícone decorativo (aria-hidden). Use texto ou aria-label no elemento pai. */
export default function Icon({ name, className, ...props }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={className} {...props}>
      {ICONS[name]}
    </svg>
  );
}

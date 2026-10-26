import { Link } from 'react-router';
import { shortcuts } from '../../data/content.js';
import './Shortcuts.css';

/** Atalhos da Home para as outras páginas do site. */
export default function Shortcuts() {
  return (
    <section className="section shortcuts" aria-labelledby="atalhos-titulo">
      <div className="container">
        <h2 className="section-title" id="atalhos-titulo">
          Continue conhecendo
        </h2>
        <ul className="shortcuts-list">
          {shortcuts.map((item) => (
            <li key={item.to}>
              <Link to={item.to} className="shortcut">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <span className="text-link">{item.cta}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

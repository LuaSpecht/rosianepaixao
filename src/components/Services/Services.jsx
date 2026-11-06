import { atendimentoQuote, bastidores, services, steps } from '../../data/content.js';
import './Services.css';

export default function Services() {
  return (
    <section className="section services" id="atendimento">
      <div className="container">
        <div className="section-head">
          <h1 className="section-title">Como eu cuido de você</h1>
          <p className="section-intro">
            Maquiagem e penteado feitos para a sua história, do primeiro contato até o momento em
            que você entra na cerimônia.
          </p>
        </div>

        <ol className="steps" aria-label="Como funciona">
          {steps.map((step, i) => (
            <li className="step" key={step.title}>
              <span className="step-number" aria-hidden="true">
                {i + 1}
              </span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>

        {bastidores.length > 0 && (
          <div className="bastidores">
            <p className="bastidores-kicker">Bastidores</p>
            <ul className="bastidores-list">
              {bastidores.map((foto) => (
                <li key={foto.src}>
                  <img src={foto.src} alt={foto.alt} width="720" height="960" loading="lazy" decoding="async" />
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="services-list">
          {services.map((service) => (
            <article className="service" key={service.title}>
              {service.image && (
                <img
                  className="service-photo"
                  src={service.image.src}
                  alt={service.image.alt}
                  width="800"
                  height="1000"
                  loading="lazy"
                  decoding="async"
                />
              )}
              <div className="service-body">
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </div>
            </article>
          ))}
        </div>

        {atendimentoQuote && (
          <figure className="services-quote">
            <blockquote>
              <p>{atendimentoQuote.text}</p>
            </blockquote>
            <figcaption>
              <span className="quote-author">{atendimentoQuote.author}</span>
              {atendimentoQuote.date && <span className="quote-date">{atendimentoQuote.date}</span>}
            </figcaption>
          </figure>
        )}
      </div>
    </section>
  );
}

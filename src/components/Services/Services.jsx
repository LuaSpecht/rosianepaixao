import { services, steps } from '../../data/content.js';
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

        <div className="services-list">
          {services.map((service) => (
            <article className="service" key={service.title}>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </article>
          ))}
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
      </div>
    </section>
  );
}

import { useRef, useState } from 'react';
import { defaultWhatsAppMessage, whatsappLink } from '../../config.js';
import { serviceOptions } from '../../data/content.js';
import { buildContactMessage } from '../../utils/whatsapp.js';
import Icon from '../Icon/Icon.jsx';
import './Contact.css';

const INITIAL = {
  nome: '',
  data: '',
  local: '',
  servico: serviceOptions[0].value,
  mensagem: '',
};

export default function Contact() {
  const [form, setForm] = useState(INITIAL);
  const [nameError, setNameError] = useState(false);
  const nameRef = useRef(null);

  const update = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (name === 'nome' && value.trim()) setNameError(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const values = Object.fromEntries(Object.entries(form).map(([k, v]) => [k, v.trim()]));

    if (!values.nome) {
      setNameError(true);
      nameRef.current?.focus();
      return;
    }

    const url = whatsappLink(buildContactMessage(values));
    // window.open dentro do submit conta como ação do usuário (não é bloqueado).
    // Sem 'noopener' nas features, senão window.open sempre retorna null.
    const win = window.open(url, '_blank');
    if (win) win.opener = null;
    else window.location.href = url;
  };

  return (
    <section className="section contact" id="contato" aria-labelledby="contato-titulo">
      <div className="container contact-grid">
        <div className="contact-text">
          <h1 className="section-title" id="contato-titulo">
            Vamos conversar sobre o seu dia
          </h1>
          <p className="section-intro">
            Preencha os dados abaixo. A mensagem abre no WhatsApp da Rosiane, pronta para você
            enviar.
          </p>
          <p className="contact-direct">
            Prefere chamar direto?{' '}
            <a href={whatsappLink(defaultWhatsAppMessage)} target="_blank" rel="noopener">
              Abrir o WhatsApp
            </a>
          </p>
        </div>

        <form className="contact-form" onSubmit={onSubmit} noValidate>
          <div className="field">
            <label htmlFor="f-nome">Seu nome</label>
            <input
              ref={nameRef}
              id="f-nome"
              name="nome"
              type="text"
              autoComplete="name"
              required
              value={form.nome}
              onChange={update}
              aria-invalid={nameError}
              aria-describedby={nameError ? 'f-nome-erro' : undefined}
            />
            {nameError && (
              <p className="field-error" id="f-nome-erro">
                Conte como podemos te chamar.
              </p>
            )}
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="f-data">Data do casamento</label>
              <input id="f-data" name="data" type="date" value={form.data} onChange={update} />
            </div>
            <div className="field">
              <label htmlFor="f-local">Cidade ou local</label>
              <input
                id="f-local"
                name="local"
                type="text"
                placeholder="Ex.: Niterói, RJ "
                value={form.local}
                onChange={update}
              />
            </div>
          </div>

          <fieldset className="field field--choices">
            <legend>O que você procura</legend>
            <div className="choices">
              {serviceOptions.map((opt) => (
                <label className="choice" key={opt.value}>
                  <input
                    type="radio"
                    name="servico"
                    value={opt.value}
                    checked={form.servico === opt.value}
                    onChange={update}
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="field">
            <label htmlFor="f-msg">
              Quer contar mais alguma coisa? <span className="optional">(opcional)</span>
            </label>
            <textarea
              id="f-msg"
              name="mensagem"
              rows="4"
              placeholder="Estilo do vestido, horário da cerimônia, madrinhas…"
              value={form.mensagem}
              onChange={update}
            />
          </div>

          <button className="btn btn--whatsapp" type="submit">
            <Icon name="whatsapp" />
            Enviar pelo WhatsApp
          </button>
        </form>
      </div>
    </section>
  );
}

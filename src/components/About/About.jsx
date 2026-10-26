import Arch, { PhotoPlaceholder } from '../Arch/Arch.jsx';
import './About.css';

export default function About() {
  return (
    <section className="section about" id="sobre">
      <div className="container about-grid">
        <figure className="about-media">
          <Arch>
            {/* TODO: trocar pela foto do editorial da Rosiane */}
            <PhotoPlaceholder title="Foto da Rosiane" note="editorial em produção" />
          </Arch>
        </figure>

        <div className="about-text">
          <h2 className="section-title">Prazer, eu sou a Rosiane.</h2>
          {/* TODO: texto provisório — substituir pela história real da Rosiane */}
          <p className="about-lead">
            Acredito que a noiva mais bonita é aquela que se olha no espelho e se reconhece.
          </p>
          <p>
            Por isso, o meu trabalho começa antes do pincel. Começa ouvindo a sua história,
            entendendo o seu estilo, o seu vestido e o que faz sentido para o seu dia.
          </p>
          <p>
            Cada maquiagem e cada penteado são pensados para valorizar a sua beleza natural, com
            técnica, produtos de qualidade e atenção a cada detalhe.
          </p>
          <p>
            No dia do casamento, quero que você se sinta tranquila e acolhida. Enquanto eu cuido da
            sua beleza, você vive o momento.
          </p>
          <p className="signature" aria-hidden="true">
            Rosiane Paixão
          </p>
        </div>
      </div>
    </section>
  );
}

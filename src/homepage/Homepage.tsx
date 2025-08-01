import React from "react";

import HeroBackground from "../img/hero_background_v2.png";
import "./Homepage.css";

function Homepage() {
  return (
    <div className="homepage">
      <section className="hero">
        <div className="hero-text">
          <h1>
            Pesquisas e dados que auxiliam na prevenção da violência de gênero
            contra mulheres.
          </h1>
          <p>
            É possível identificar sinais de violência em atendimentos de rotina
            da atenção primária em saúde? Nós acreditamos que sim. Com o uso do
            pareamento de bancos de dados da saúde e tecnologia linguística, a
            Vital Strategies e FrameNet Brasil utilizaram inteligência
            artificial para analisar os textos de prontuários eletrônicos de
            atendimentos da atenção primária de mulheres de Recife.
          </p>
          <p>
            Os casos com notificação de violências no SINAN e prontuários foram
            utilizados como padrão para treinar o modelo de inteligência
            artificial para a compreensão dos padrões de saúde de mulheres
            vivenciando a violência. Esse modelo foi, então, aplicado aos demais
            casos para identificar padrões de violência não notificada. A IA
            permite estimar o cenário de prováveis casos não-notificados por
            unidade de saúde.
          </p>
        </div>
        <img src={HeroBackground} alt="" />
      </section>

      <section className="explore">
        <h2>Explore nossos dados</h2>
        <p>
          Utilize nossa ferramenta de visualização interativa para explorar uma
          ampla gama de indicadores relacionados à violência contra a mulher.
        </p>
      </section>
    </div>
  );
}

export default Homepage;

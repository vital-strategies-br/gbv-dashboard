import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import HeroBackground from "../img/hero_background_v2.png";
import "./Homepage.css";

function Homepage() {
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const id = location.hash.replace("#", "");
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 0);
    }
  }, [location]);

  return (
    <div className="homepage">
      <section className="hero">
        <div className="hero-text">
          <h1>Painel de subnotificação da violência de gênero no Recife</h1>
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
            utilizados para treinar o modelo de inteligência artificial para a
            compreensão dos padrões de saúde de mulheres vivenciando a
            violência. A partir desse aprendizado, o modelo foi aplicado aos
            demais atendimentos para identificar possíveis ocorrências não
            notificadas. A IA permite estimar o cenário de casos prováveis
            não-notificados por unidade de saúde.
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

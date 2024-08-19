import React from "react";

// Components
import Section from "./common/Section";
import Homepage from "./homepage/Homepage";
import MapView from "./mapview/MapView";
// Icons
import Demographic from "./icons/demographic.svg";
import GraphBar from "./icons/graph-bar.svg";
import TrendInspect from "./icons/trend-inspect.svg";
// CSS
import "./App.css";

function App() {
  return (
    <div className="viewport">
      <Homepage />

      <Section
        id="dashboard"
        title="Subnotificação de violência contra mulher no município de Recife"
        subtitle="Estimativa de Subnotificação por 10.000 usuárias das atenção básica."
        iconSrc={Demographic}
        iconAlt=""
        defaultOpen
      >
        <MapView />
      </Section>

      <Section
        id="patterns-over-time"
        title="Padrões de registros ao longo do tempo"
        subtitle="Mapeamento de registros no e-SUS AB antes e depois do episódio de violência."
        iconSrc={TrendInspect}
        iconAlt=""
      >
        <h3 style={{ margin: "32px"}}>Em construção.</h3>
      </Section>

      <Section
        id="gbv-lexicon"
        title="Léxico da Violência de Gênero"
        subtitle="Palavras, expressões e conceitos associados à identificação de padrões de violência no e-SUS AB."
        iconSrc={GraphBar}
        iconAlt=""
      >
        <h3 style={{ margin: "32px"}}>Em construção.</h3>
      </Section>
    </div>
  );
}

export default App;

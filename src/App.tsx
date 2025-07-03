import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./common/Navbar";
import Homepage from "./homepage/Homepage";
import TechnicalNote from "./technicalnote/TechnicalNote";
import Section from "./common/Section";
import MapView from "./mapview/MapView";
import LexiconView from "./lexiconview/LexiconView";
import TemporalTrendView from "./temporaltrendview/TemporalTrendView";
import Demographic from "./icons/demographic.svg";
import GraphBar from "./icons/graph-bar.svg";
import TrendInspect from "./icons/trend-inspect.svg";
import "./App.css";

function DashboardSections() {
  return (
    <>
      <Section
        id="painel"
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
        <TemporalTrendView />
      </Section>
      <Section
        id="gbv-lexicon"
        title="Léxico da Violência de Gênero"
        subtitle="Palavras, expressões e conceitos associados à identificação de padrões de violência no e-SUS AB."
        iconSrc={GraphBar}
        iconAlt=""
      >
        <LexiconView />
      </Section>
    </>
  );
}

function App() {
  return (
    <Router basename="/gbv-dashboard">
      <div className="viewport">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Homepage />
                <DashboardSections />
              </>
            }
          />
          <Route path="/nota-tecnica" element={<TechnicalNote />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
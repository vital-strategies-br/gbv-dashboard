import React, { useState } from "react";
import Select from "react-select";

// Types
import { KeynessData } from "./types";
// Data
import LexiconDataJson from "./data/lexicon.json";
// CSS
import "./Lexicon.css";

const data: KeynessData[] = LexiconDataJson;

const typeSet = new Set(data.map((x) => x.notification_type));
const typeOptions = Array.from(typeSet).map((x) => ({ value: x, label: x }));
const frameSet = new Set(data.map((x) => x.frame));
const frameOptions = Array.from(frameSet).map((x) => ({ value: x, label: x }));
const yearSet = new Set(data.map((x) => x.year));
const yearOptions = Array.from(yearSet).map((x) => ({
  value: x,
  label: x.toString(),
}));

function Lexicon() {
  let [filterType, setFilterType] = useState<string>(typeOptions[0].value);
  let [filterFrame, setFilterFrame] = useState<string>(frameOptions[0].value);
  let [filterYear, setFilterYear] = useState<number>(yearOptions[0].value);

  return (
    <div className="lexicon-content content">
      <div className="lexicon-filter-container">
        <div className="lexicon-filter-field-container">
          <span>Tipo de violência</span>
          <Select
            options={typeOptions}
            value={typeOptions.find((x) => x.value === filterType)}
            onChange={(option: any) => setFilterType(option.value)}
            placeholder="Selecione..."
          />
        </div>
        <div className="lexicon-filter-field-container">
          <span>Selecione o tópico</span>
          <Select
            options={frameOptions}
            value={frameOptions.find((x) => x.value === filterFrame)}
            onChange={(option: any) => setFilterType(option.value)}
            placeholder="Selecione..."
          />
        </div>
        <div className="lexicon-filter-field-container">
          <span>Selecione o período</span>
          <Select
            options={yearOptions}
            value={yearOptions.find((x) => x.value === filterYear)}
            onChange={(option: any) => setFilterYear(option.value)}
            placeholder="Selecione..."
          />
        </div>
      </div>
      <div className="lexicon-main-container">
        <div className="lexicon-text-wrapper">
          <p>
            O gráfico ao lado mostra a distribuição etária de vítimas de
            violência interpessoal em relação a diferentes condições de saúde. O
            eixo X representa essas condições, enquanto o eixo Y indica a
            relevância de cada uma para esse tipo de violência; cada barra
            empilhada é segmentada por faixas etárias, permitindo visualizar
            como determinadas condições, como gravidez, surto psiquiátrico ou
            varizes, estão distribuídas entre diferentes grupos de idade,
            possibilitando a identificação de padrões e auxiliando na formulação
            de estratégias de prevenção e intervenção mais eficazes.
          </p>
          <p>Clique nas barras para mais detalhes.</p>
        </div>
        <div className="lexicon-chart-wrapper"></div>
      </div>
    </div>
  );
}

export default Lexicon;

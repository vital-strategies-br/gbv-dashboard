import React, { useState } from "react";
import Select from "react-select";

// Components
import BarChart from "./BarChart";
// Types
import { KeynessData } from "./types";
// Data
import LexiconDataJson from "./data/lexicon.json";
// CSS
import "./LexiconView.css";

const transformKeyness = (keyness: number): number =>
  keyness !== 0 ? (keyness - 1) * 100 : 0;

// Load data adapting keyness values
const data: KeynessData[] = LexiconDataJson.visualization_data.map((entry) => ({
  ...entry,
  data: entry.data.map((dataPoint) => ({
    ...dataPoint,
    keyness: transformKeyness(dataPoint.keyness),
    age_groups: dataPoint.age_groups.map((ageGroup) => ({
      ...ageGroup,
      keyness: transformKeyness(ageGroup.keyness),
    })),
  })),
}));

const typeSet = new Set(data.map((x) => x.violence_type));
const typeOptions = Array.from(typeSet).map((x) => ({ value: x, label: x }));
const frameSet = new Set(data.map((x) => x.frame));
const frameOptions = Array.from(frameSet).map((x) => ({ value: x, label: x }));
// const yearSet = new Set(data.map((x) => x.year));
// const yearOptions = Array.from(yearSet).map((x) => ({
//   value: x,
//   label: x.toString(),
// }));

function Lexicon() {
  let [filterType, setFilterType] = useState<string>(typeOptions[0].value);
  let [filterFrame, setFilterFrame] = useState<string>(frameOptions[0].value);
  // let [filterYear, setFilterYear] = useState<number>(yearOptions[0].value);

  const entry = data.find(
    (x) => x.violence_type === filterType && x.frame === filterFrame
    // & x.year === filterYear
  );
  const topLUs = entry?.top_lus;

  return (
    <div className="lexicon-content content">
      <div className="filter-container">
        <div className="filter-field-container">
          <span>Natureza da violência</span>
          <Select
            options={typeOptions}
            value={typeOptions.find((x) => x.value === filterType)}
            onChange={(option: any) => setFilterType(option.value)}
            placeholder="Selecione..."
          />
        </div>
        <div className="filter-field-container">
          <span>Selecione o tópico</span>
          <Select
            options={frameOptions}
            value={frameOptions.find((x) => x.value === filterFrame)}
            onChange={(option: any) => setFilterFrame(option.value)}
            placeholder="Selecione..."
          />
        </div>
        {/* <div className="filter-field-container">
          <span>Selecione o período</span>
          <Select
            options={yearOptions}
            value={yearOptions.find((x) => x.value === filterYear)}
            onChange={(option: any) => setFilterYear(option.value)}
            placeholder="Selecione..."
          />
        </div> */}
      </div>
      <div className="lexicon-main-container">
        <div className="lexicon-text-wrapper">
          <p>
            Este gráfico mostra os termos mais comuns nos registros do e-SUS APS
            de mulheres vítimas de violência. Cada barra representa a{" "}
            <strong>variação percentual</strong> da frequência de um termo em
            relação à população geral feminina.
          </p>
          <p>
            O <strong>eixo horizontal</strong> mostra os termos, e o{" "}
            <strong>eixo vertical</strong> indica se eles são mais ou menos
            frequentes entre mulheres que sofreram violência.{" "}
            <strong>Valores positivos</strong> indicam maior frequência, e{" "}
            <strong>valores negativos</strong> indicam menor frequência.As cores
            representam diferentes faixas etárias.
          </p>
          <p>
            <strong>
              Clique nas barras para ver detalhes sobre as variações por faixa
              etária.
            </strong>
          </p>
          <p>
            Para comparação, esses são os (as)
            <strong>{filterFrame.toUpperCase()}</strong> mais comuns na
            população geral no mesmo período:
          </p>
          <div className="lexicon-top-lus">
            <ol>
              {topLUs?.map((lu, index) => (
                <li key={index}>{lu}</li>
              ))}
            </ol>
          </div>
        </div>

        <div className="lexicon-chart-wrapper">
          <BarChart
            data={entry?.data || []}
            ageGroupLabels={LexiconDataJson.labels}
          />
        </div>
      </div>
    </div>
  );
}

export default Lexicon;

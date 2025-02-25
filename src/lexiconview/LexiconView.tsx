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

const data: KeynessData[] = LexiconDataJson.visualization_data;

const typeSet = new Set(data.map((x) => x.violence_type));
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

  const entry = data.find(
    (x) =>
      x.violence_type === filterType &&
      x.frame === filterFrame &&
      x.year === filterYear
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
        <div className="filter-field-container">
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
            O gráfico ao lado mostra os itens lexicais mais relevantes nos
            registros de vítimas de violência no e-SUS APS. A visualização pode
            ser customizada para o tipo de violência sofrida, o período e um
            determinado tópico e apresenta valores para diferentes faixas
            etárias. Enquanto o eixo X apresenta o nome dos itens lexicais, o
            eixo Y indica a relevância de cada item em relação a população geral
            na mesma faixa etária. Portanto, um item lexical com relevância 5
            deve ser entendido como 5 vezes MAIS frequente nos registros de
            vítimas. Já valores negativos, como por exemplo -3, indicariam que o
            item lexical é três vezes MENOS frequente nos registros de vítimas.
          </p>
          <p>
            <strong>Clique nas barras para mais detalhes.</strong>
          </p>
          <p>
            Para fins de comparação, essas(es) são as(os){" "}
            <strong>{filterFrame.toUpperCase()}</strong> mais comuns para
            usuárias <em>não vítimas de violência</em> no mesmo período:
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

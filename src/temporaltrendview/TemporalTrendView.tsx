import React, { useState } from "react";
import Select from "react-select";

// Types
import { TemporalData } from "./types";
// Data
import TemporalDataJson from "./data/temporaldata.json";
// Components
import LineChart from "./LineChart";
// CSS
import "./TemporalTrendView.css";

const data: TemporalData[] = TemporalDataJson.visualization_data;

const typeSet = new Set(data.map((x) => x.violence_type));
const typeOptions = Array.from(typeSet).map((x) => ({ value: x, label: x }));
const ageGroupOptions = TemporalDataJson.labels.map((x, i) => ({
  value: i,
  label: x,
}));

function TemporalTrendView() {
  const [filterType, setFilterType] = useState<string>(typeOptions[0].value);
  const [filterAgeGroup, setFilterAgeGroup] = useState<number>(
    ageGroupOptions[0].value
  );
  const [currentState, setCurrentState] = useState(0);

  const entry = data.find(
    (x) => x.violence_type === filterType && x.age_group === filterAgeGroup
  );

  return (
    <div className="temporal-trend-content content">
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
          <span>Faixa etária</span>
          <Select
            options={ageGroupOptions}
            value={ageGroupOptions.find((x) => x.value === filterAgeGroup)}
            onChange={(option: any) => setFilterAgeGroup(option.value)}
            placeholder="Selecione..."
          />
        </div>
      </div>
      <div className="temporal-trend-main-container">
        <div className="temporal-trend-text-wrapper">
          <p>
            O gráfico ao lado mostra a probabilidade de aumento nos atendimentos
            de saúde ao longo do tempo em relação ao momento da violência,
            considerando um grupo de {entry?.n || "-"} mulheres/meninas. O eixo
            X representa a diferença em dias para a ocorrência do evento de
            violência, com valores negativos indicando o período anterior e
            positivos correspondendo ao período posterior. O eixo Y exibe a
            probabilidade de aumento nos atendimentos, permitindo observar
            tendências ao longo do tempo.
          </p>
        </div>
        <div>
          <LineChart
            data={entry?.data || []}
            annotations={[
              { text: "Dia do evento de violência", xPos: 0 },
              { text: "90 dias antes", xPos: -90 },
            ]}
          />
          <div className="carousel-controls">
            {[0, 1, 2].map((index) => (
              <button
                key={index}
                className={`carousel-button ${
                  currentState === index ? "active" : ""
                }`}
                onClick={() => setCurrentState(index)}
              >
                ●
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TemporalTrendView;

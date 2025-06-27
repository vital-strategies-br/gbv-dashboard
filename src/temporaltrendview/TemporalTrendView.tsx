import React, { useState } from "react";
import Select from "react-select";

// Types
import { TemporalData } from "./types";
// Data
import TemporalDataJson from "./data/temporaldata.json";
// Components
import LineChart from "./LineChart";
// Images
import ChevronRight from "../icons/chevron-right.svg";
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

  const entry = data.find((x) => x.violence_type === filterType)?.age_groups?.[
    filterAgeGroup
  ];
  const daysBefore = entry?.highlightDay || -90;

  // Define annotations
  const annotations = [];
  if (currentState >= 1) {
    annotations.push({ text: "Dia da identificação de violência", xPos: 0 });
  }
  if (currentState >= 2) {
    annotations.push({ text: `${-daysBefore} dias antes`, xPos: daysBefore });
  }

  const texts = [
    [
      <>
        O gráfico ao lado mostra como a chance de uma mulher ou menina procurar
        atendimento na saúde aumenta nos dias próximos a uma situação de
        violência.
      </>,
      <>
        <strong>
          Este gráfico representa um total de {entry?.n} mulheres e meninas
        </strong>{" "}
        com os filtros atuais aplicados.
      </>,
      <>
        O eixo de baixo (<strong>horizontal</strong>) representa o tempo: os
        dias antes e depois do momento em que a violência foi reconhecida por
        algum serviço de saúde. Isso pode acontecer, por exemplo, com uma
        notificação no Sinan, uma internação por causa externa ou quando a
        paciente menciona a violência no prontuário do e-SUS APS.
      </>,
      <>
        O eixo da lateral (<strong>vertical</strong>) mostra a probabilidade de
        que o número de atendimentos aumente naquele dia, comparado com outros
        períodos.
      </>,
      <>
        <strong>Essa probabilidade já começa alta</strong>: mulheres e meninas em situação de
        violência tendem a procurar mais os serviços de saúde, mesmo antes de
        falar sobre a violência explicitamente.
      </>,
    ],
    [
      <>
        O <strong>dia 0</strong>, destacado com uma linha, representa o momento
        em que a violência é registrada de alguma forma no sistema de saúde.
      </>,
      <>
        Observe que, nos dias anteriores ao Dia 0, há uma tendência de aumento
        nos atendimentos. Isso significa que, em muitos casos, a vítima já
        estava buscando ajuda, mesmo que ainda não tenha dito ou não tenha sido
        identificada como alguém em situação de violência.
      </>,
    ],
    [
      <>
        Quando toda a população feminina é analisada em conjunto,
        considerando-se todos os tipos de violência, o padrão geral que surge é
        o de que os atendimentos das vítimas tendem a aumentar cerca de{" "}
        <strong>{daysBefore} dias</strong> antes da data em que a violência é
        identificada.
      </>,
      <>
        Esse padrão apresenta uma possibilidade de se identificar casos antes de
        um agravamento. Esse é um padrão geral e, portanto, deve ser
        relativizado para cada faixa etária para um direcionamento mais preciso.
      </>,
    ],
  ];

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
        <div className="temporal-trend-left-container">
          {texts[currentState].map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
          <div className="temporal-trend-button-wrapper">
            {currentState === [0, 1, 2].length - 1 ? (
              <a href="#" style={{ textDecoration: "none", color: "inherit" }}>
                <button className="button">
                  <span>Entenda como esses dados foram analisados</span>
                </button>
              </a>
            ) : (
              <button
                onClick={() => setCurrentState(currentState + 1)}
                className="button"
              >
                <span>Avançar</span>
                <img alt="" src={ChevronRight} />
              </button>
            )}
          </div>
        </div>
        <div>
          <LineChart data={entry?.data || []} annotations={annotations} />
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

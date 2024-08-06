import React, { useState } from "react";
import Select from "react-select";

// Components
import HistogramChart from "./HistogramChart";
import SVGMap from "./SVGMap";
import SectionHeader from "../common/SectionHeader";
import Tooltip from "./Tooltip";
// Types
import { NeighborhoodData, UISubnotificationData } from "./types";
// Image
import Demographic from "../icons/demographic.svg";
import Document from "../icons/document.svg";
// Data
import DashboardDataJson from "./data/dashboard.json";
// CSS
import "./MapView.css";

const data: NeighborhoodData[] = DashboardDataJson;
const yearsSet = new Set(data.map(x => x.data.map(y => y.year)).flat());
const yearOptions = Array.from(yearsSet).map(x => ({ value: x, label: x.toString() }));

function MapView() {
  let [selectedNeighborhood, setSelectedNeighborhood] = useState<number | null>(
    null
  );
  let [hoveredNeighborhood, setHoveredNeighborhood] = useState<number | null>(null);
  let [filterYear, setFilterYear] = useState<number | null>(null);

  function onPathClick(id: number) {
    if (id === selectedNeighborhood) {
      setSelectedNeighborhood(null);
    } else {
      setSelectedNeighborhood(id);
    }
  }


  const filtered = Object.fromEntries(
    data.map((neighborhood) => {
      const yearData = neighborhood.data.find(x => x.year === filterYear);

      return [
        neighborhood.id_shape,
        {
          name: neighborhood.name,
          ...yearData
        } as UISubnotificationData,
      ];

    })
  );

  let name = data.find(
    (neighborhood) => neighborhood.id_shape === selectedNeighborhood
  )?.name;

  const onYearChange = (option: any) => setFilterYear(option.value)

  return (
    <div className="mapview-container">
      <SectionHeader
        title="Subnotificação de violência contra mulher no município de Recife"
        subtitle="Estimativa de Subnotificação por 10.000 usuárias das atenção básica."
        iconSrc={Demographic}
        iconAlt=""
      />
      <div className="mapview-body">
        <div className="mapview-content content">
          <div className="mapview-section">
            <div className="mapview-filter-container">
              <div className="mapview-filter-field-container">
                <span>Selecione o período</span>
                <Select options={yearOptions} onChange={onYearChange} placeholder="Selecione..." />
              </div>
              <div className="mapview-filter-field-container">
                <span>Selecione a faixa etária</span>
                <Select placeholder="Selecione..." noOptionsMessage={() => "Sem opções"} />
              </div>
            </div>
            <div className="mapview-map-container">
              {(filterYear && hoveredNeighborhood != null) &&
                <Tooltip data={filtered[hoveredNeighborhood]} />
              }
              <SVGMap
                data={filtered}
                selectedShapeId={selectedNeighborhood}
                onPathClick={onPathClick}
                onPathMouseEnter={id => setHoveredNeighborhood(id)}
                onMapMouseLeave={() => setHoveredNeighborhood(null)}
              />
            </div>
          </div>
          <div className="mapview-section">
            <div className="mapview-instructions-wrapper">
              <span className="mapview-instructions">
                O mapa do Recife à esquerda mostra a estimativa de subnotificação de casos de violência contra a mulher para cada 10.000 usuárias da atenção básica (AB) em cada bairro. O gráfico de barras agrupa bairros em faixas de estimativa similares. Ao passar o mouse sobre cada barra, destacam-se os bairros com quantidades similares de possíveis casos de violência não identificados pelo sistema de saúde para aquelas localidades.
              </span>
            </div>
            {selectedNeighborhood ? (
              <h3>{name}</h3>
            ) : (
              <>
                <HistogramChart data={filtered} bins={15} xAxisLimits={[0.1, .9]} yAxisLimits={[0, 30]}/>
                <div className="report-button-wrapper">
                  <button className="report-button">
                    <img alt="" src={Document} />
                    <span>Saiba mais sobre a pesquisa que deu origem a estes dados</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapView;

import React, { useState } from "react";
import Select from "react-select";

// Components
import BarChart from "./BarChart";
import SVGMap from "./SVGMap";
import SectionHeader from "../common/SectionHeader";
// Types
import { NeighborhoodData } from "./types";
// Image
import Demographic from "../icons/demographic.svg";
// Data
import DashboardDataJson from "./data/dashboard.json";
// CSS
import "./MapView.css";

const data: Array<NeighborhoodData> = DashboardDataJson;
const yearsSet = new Set(data.map(x => x.data.map(y => y.year)).flat());
const yearOptions = Array.from(yearsSet).map(x => ({ value: x, label: x.toString() }));

function MapView() {
  let [selectedNeighborhood, setSelectedNeighborhood] = useState<number | null>(
    null
  );
  let [filterYear, setFilterYear] = useState<number | null>(null);

  function onPathClick(id: number) {
    if (id === selectedNeighborhood) {
      setSelectedNeighborhood(null);
    } else {
      setSelectedNeighborhood(id);
    }
  }

  let filtered = Object.fromEntries(
    data.map((neighborhood) => {
      const yearData = neighborhood.data.find(x => x.year === filterYear);
      const value = yearData?.subnotification_rate || null

      return [
        neighborhood.id_shape,
        {
          name: neighborhood.name,
          value: value,
        },
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
        iconAlt="Icon of a group of people"
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
              <SVGMap
                selectedShape={selectedNeighborhood}
                onPathClick={onPathClick}
                data={filtered}
              />
            </div>
          </div>
          <div className="mapview-section">
            {selectedNeighborhood ? (
              <h3>{name}</h3>
            ) : (
              <>
                <span className="mapview-instructions">
                    O mapa do Recife à esquerda mostra a estimativa de
                    subnotificação de casos de violência contra a mulher para cada
                    10.000 usuárias de atenção básica (AB) em cada bairro. O
                    gráfico de barras agrupa bairros em faixa de estimativa
                    similares. Ao passar o mouse sobre cada barra, destacam-se os
                    bairros com quantidades similares de possíveis casos de
                    violência não identficados pelo sistema de saúde para aquelas
                </span>
                <BarChart data={filtered} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapView;

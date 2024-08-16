import React, { useState, useMemo } from "react";
import Select from "react-select";

// Components
import HistogramChart from "./HistogramChart";
import SVGMap from "./SVGMap";
import TerritoryDetail from "./TerritoryDetail";
import Tooltip from "./Tooltip";
// Types
import { NeighborhoodData, RelativeCategory, TerritoryId } from "./types";
// Utils
import { applyFilter, assignCategories, getHistogramData } from "./utils";
// Image
import Document from "../icons/document.svg";
// Data
import DashboardDataJson from "./data/dashboard.json";
// CSS
import "./MapView.css";

// Constants
const HISTOGRAM_BINS = 20;
const HISTOGRAM_X_AXIS_LIMITS: [number, number] = [0.2, 0.8];
const HISTOGRAM_Y_AXIS_LIMITS: [number, number] = [0, 25];
// Derived
const data: NeighborhoodData[] = assignCategories(DashboardDataJson); // all data
const neighborhoodOptions = data.map((obj) => ({
  value: obj.id_shape,
  label: obj.name,
}));
const yearsSet = new Set(data.map((x) => x.data.map((y) => y.year)).flat());
const yearOptions = Array.from(yearsSet).map((x) => ({
  value: x,
  label: x.toString(),
}));

function MapView() {
  let [selectedNeighborhood, setSelectedNeighborhood] =
    useState<Nullable<TerritoryId>>(null);
  let [hoveredNeighborhood, setHoveredNeighborhood] =
    useState<Nullable<TerritoryId>>(null);
  let [highlightedCategory, setHighlightedCategory] =
    useState<Nullable<RelativeCategory>>(null);
  let [filterYear, setFilterYear] = useState<Nullable<number>>(null);

  // Compute derived data
  const filteredData = useMemo(
    () => (filterYear ? applyFilter(data, (x) => x.year === filterYear) : []),
    [filterYear]
  );
  const filteredDataById = useMemo(
    () => Object.fromEntries(filteredData.map((obj) => [obj.id_shape, obj])),
    [filteredData]
  );
  const [binCounts, binCategories, nullCount] = useMemo(
    () =>
      getHistogramData(filteredData, HISTOGRAM_BINS, HISTOGRAM_X_AXIS_LIMITS),
    [filteredData]
  );

  return (
    <div className="mapview-content content">
      <div className="mapview-section">
        <div className="mapview-filter-container">
          <div className="mapview-filter-field-container">
            <span>Selecione o período</span>
            <Select
              options={yearOptions}
              onChange={(option: any) => setFilterYear(option.value)}
              placeholder="Selecione..."
            />
          </div>
          {/* <div className="mapview-filter-field-container">
                <span>Selecione a faixa etária</span>
                <Select
                  placeholder="Selecione..."
                  noOptionsMessage={() => "Sem opções"}
                />
              </div> */}
          <div className="mapview-filter-field-container">
            <span>Busca por bairro</span>
            <Select
              options={neighborhoodOptions}
              onChange={(option: any) => setSelectedNeighborhood(option?.value)}
              isDisabled={filterYear === null}
              isSearchable
              isClearable
              placeholder="Digite..."
              noOptionsMessage={() => "Sem opções"}
            />
          </div>
        </div>
        <div className="mapview-map-container">
          {filterYear && hoveredNeighborhood != null && (
            <Tooltip data={filteredDataById[hoveredNeighborhood]} />
          )}
          <SVGMap
            data={filteredDataById}
            selectedShapeId={selectedNeighborhood}
            highlightedCategory={highlightedCategory}
            onPathClick={(id: number) => {
              if (id === selectedNeighborhood) {
                setSelectedNeighborhood(null);
              } else {
                setSelectedNeighborhood(id);
              }
            }}
            onPathMouseEnter={(id) => {
              setHoveredNeighborhood(id);
              setHighlightedCategory(filteredDataById[id]?.category || null);
            }}
            onMapMouseLeave={() => {
              setHoveredNeighborhood(null);
              setHighlightedCategory(null);
            }}
          />
        </div>
      </div>
      <div className="mapview-section">
        <div className="mapview-instructions-wrapper">
          <p className="mapview-instructions">
            O mapa do Recife à esquerda mostra a estimativa de subnotificação de
            casos de violência contra a mulher para cada 10.000 usuárias da
            atenção básica (AB) em cada bairro. O gráfico de barras agrupa
            bairros em faixas de estimativa similares. Ao passar o mouse sobre
            cada barra, destacam-se os bairros com quantidades similares de
            possíveis casos de violência não identificados pelo sistema de saúde
            para aquelas localidades.
          </p>
        </div>
        {selectedNeighborhood ? (
          <TerritoryDetail data={filteredDataById[selectedNeighborhood]} />
        ) : (
          <HistogramChart
            binCounts={binCounts}
            binCategories={binCategories}
            nullCount={nullCount}
            xAxisLimits={HISTOGRAM_X_AXIS_LIMITS}
            yAxisLimits={HISTOGRAM_Y_AXIS_LIMITS}
            highlightedCategory={highlightedCategory}
            onBarMouseEnter={(cat) => setHighlightedCategory(cat)}
            onBarMouseLeave={() => setHighlightedCategory(null)}
          />
        )}
        <div className="report-button-wrapper">
          <button className="report-button">
            <img alt="" src={Document} />
            <span>
              Saiba mais sobre a pesquisa que deu origem a estes dados
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default MapView;

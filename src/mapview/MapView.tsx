import React, { useState, useMemo } from "react";
import Select from "react-select";
import { Link } from "react-router-dom";

// Components
import HistogramChart from "./HistogramChart";
import SVGMap from "./SVGMap";
import TerritoryDetail from "./TerritoryDetail";
import Tooltip from "./Tooltip";
// Types
import { TerritoryData, TerritoryId } from "./types";
// Utils
import { applyFilter, assignCategories, getHistogramData } from "./utils";
// Image
import Document from "../icons/document.svg";
// Data
import DashboardDataJson from "./data/mapdata.json";
// CSS
import "./MapView.css";

// Constants
const HISTOGRAM_BINS = 20;
const HISTOGRAM_X_AXIS_LIMITS: [number, number] = [0, 4000];
const HISTOGRAM_Y_AXIS_LIMITS: [number, number] = [0, 25];
// Derived
const data: TerritoryData[] = assignCategories(DashboardDataJson); // all data
const territoryOptions = data.map((obj) => ({
  value: obj.id_shape,
  label: obj.name,
}));
const yearsSet = new Set(data.map((x) => x.periods.map((y) => y.year)).flat());
const yearOptions = Array.from(yearsSet).map((x) => ({
  value: x,
  label: x.toString(),
}));

function MapView() {
  let [selectedTerritory, setSelectedTerritory] =
    useState<Nullable<TerritoryId>>(null);
  let [hoveredTerritory, setHoveredTerritory] =
    useState<Nullable<TerritoryId>>(null);
  let [highlightedBin, setHighlightedBin] = useState<Nullable<number>>();
  let [filterYear, setFilterYear] = useState<number>(
    yearOptions[yearOptions.length - 1].value
  );

  // Compute derived data
  const filteredData = useMemo(
    () => (filterYear ? applyFilter(data, (x) => x.year === filterYear) : []),
    [filterYear]
  );
  const filteredDataById = useMemo(
    () => Object.fromEntries(filteredData.map((obj) => [obj.id_shape, obj])),
    [filteredData]
  );
  const [binData, binCategories, nullCount, territoryBins] = useMemo(() => {
    const [binData, binCategories, nullCount] = getHistogramData(
      filteredData,
      (obj) =>
        obj.subnotification_rate ? obj.subnotification_rate * 10 * 1000 : null,
      HISTOGRAM_BINS,
      HISTOGRAM_X_AXIS_LIMITS
    );
    const territoryBins: { [key: number]: number } = {};

    binData.forEach((territories, index) => {
      territories.forEach((obj) => {
        territoryBins[obj.id_shape] = index;
      });
    });

    return [binData, binCategories, nullCount, territoryBins];
  }, [filteredData]);

  return (
    <div className="mapview-content content">
      <div className="mapview-section">
        <div className="filter-container">
          <div className="filter-field-container">
            <span>Selecione o período</span>
            <Select
              options={yearOptions}
              value={yearOptions.find((x) => x.value === filterYear)}
              onChange={(option: any) => setFilterYear(option.value)}
              placeholder="Selecione..."
            />
          </div>
          {/* <div className="filter-field-container">
            <span>Selecione a faixa etária</span>
            <Select
              placeholder="Selecione..."
              noOptionsMessage={() => "Sem opções"}
            />
          </div> */}
          <div className="filter-field-container">
            <span>Busca por bairro</span>
            <Select
              options={territoryOptions}
              value={territoryOptions.find(
                (x) => x.value === selectedTerritory
              )}
              onChange={(option: any) => setSelectedTerritory(option?.value)}
              isDisabled={filterYear === null}
              isSearchable
              isClearable
              placeholder="Digite..."
              noOptionsMessage={() => "Sem opções"}
            />
          </div>
        </div>
        <div className="mapview-map-container">
          {filterYear && hoveredTerritory != null && (
            <Tooltip data={filteredDataById[hoveredTerritory]} />
          )}
          <SVGMap
            data={filteredDataById}
            selectedShapeId={selectedTerritory}
            // highlightedCategory={highlightedCategory}
            highlightedTerritories={
              highlightedBin
                ? binData[highlightedBin].map((obj) => obj.id_shape)
                : []
            }
            onPathClick={(id: number) => {
              if (id === selectedTerritory) {
                setSelectedTerritory(null);
              } else {
                setSelectedTerritory(id);
              }
            }}
            onPathMouseEnter={(id) => {
              setHoveredTerritory(id);
              setHighlightedBin(territoryBins[id]);
            }}
            onMapMouseLeave={() => {
              setHoveredTerritory(null);
              setHighlightedBin(null);
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
        {selectedTerritory ? (
          <TerritoryDetail data={filteredDataById[selectedTerritory]} />
        ) : (
          <HistogramChart
            binCounts={binData.map((x) => x.length)}
            binCategories={binCategories}
            nullCount={nullCount}
            xAxisLimits={HISTOGRAM_X_AXIS_LIMITS}
            yAxisLimits={HISTOGRAM_Y_AXIS_LIMITS}
            highlightedBin={highlightedBin}
            onBarMouseEnter={(index) => setHighlightedBin(index)}
            onBarMouseLeave={() => setHighlightedBin(null)}
          />
        )}
        <div className="report-button-wrapper">
          <Link to="/nota-tecnica#subnotificacao-violencia-recife" className="no-underline">
            <button className="button">
              <img alt="" src={Document} />
              <span>
                Saiba mais sobre a pesquisa que deu origem a estes dados
              </span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MapView;

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
import {
  applyFilter,
  getCategoryScheme,
  assignCategories,
  getHistogramData,
} from "./utils";
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

  const all_rates = filteredData
    .map((obj) => obj.subnotification_rate)
    .filter((x): x is number => x != null);
  const average_rate = all_rates.reduce((a, b) => a + b, 0) / all_rates.length;
  const median_rate = (() => {
    const sorted = all_rates.slice().sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 !== 0
      ? sorted[mid]
      : (sorted[mid - 1] + sorted[mid]) / 2;
  })();

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

  const rateToPer10k = (r: number) => r * 10 * 1000;
  const categoryBoundaries = useMemo(() => {
    const scheme = getCategoryScheme();

    // Use the same base variable that z-scores were computed from:
    // subnotification_rate (NOT multiplied)
    const rates = filteredData
      .map((d) => d.subnotification_rate)
      .filter((x): x is number => x != null);

    // Guard: if no data, just return scheme (SVGMap can fallback)
    if (rates.length === 0) return scheme;

    const mean = rates.reduce((a, b) => a + b, 0) / rates.length;

    // Population std dev (most common for display thresholds; use sample if you prefer)
    const variance =
      rates.reduce((sum, x) => sum + (x - mean) * (x - mean), 0) / rates.length;
    const std = Math.sqrt(variance);

    // Convert z-score boundaries (-3..3 etc) into rate-per-10k boundaries
    const boundariesRatePer10k = scheme.boundaries.map((z) =>
      rateToPer10k(mean + z * std)
    );

    return {
      ...scheme,
      zBoundaries: scheme.boundaries,
      boundaries: boundariesRatePer10k,
      mean,
      std,
    };
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
            categoryBoundaries={categoryBoundaries}
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
            avgValue={average_rate * 10 * 1000}
            medianValue={median_rate * 10 * 1000}
            highlightedBin={highlightedBin}
            onBarMouseEnter={(index) => setHighlightedBin(index)}
            onBarMouseLeave={() => setHighlightedBin(null)}
          />
        )}
        <div className="report-button-wrapper">
          <Link
            to="/nota-tecnica#subnotificacao-violencia-recife"
            className="no-underline"
          >
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

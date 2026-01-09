import React from "react";

// Types
import { SVGMapProps } from "./types";
// Utils
import { getColorForCategory, NA_COLOR } from "./utils";
// Data
import shapes from "./shapes/recife-4098pts-with-bbox.json";
// CSS
import "./SVGMap.css";

function SVGMap({
  data,
  selectedShapeId,
  categoryBoundaries,
  highlightedCategory,
  highlightedTerritories = [],
  onPathClick,
  onPathMouseEnter,
  onMapMouseLeave,
}: SVGMapProps) {
  const legendItems = (() => {
    if (!categoryBoundaries) return null;

    const { allCategories, innerCategories, boundaries } = categoryBoundaries;

    // boundaries includes endpoints [-3, ..., 3]
    // innerCategories correspond to intervals (-3..3) split into equal steps
    // extremes are <= -3 and >= 3
    const items: Array<{ label: string; color: string }> = [];

    const fmt = (n: number) =>
      new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 }).format(
        Math.round(Math.max(0, n))
      );

    // Lower extreme
    items.push({
      label: `${allCategories[0]} (≤ ${fmt(boundaries[0])})`,
      color: getColorForCategory(allCategories[0]),
    });

    // Inner buckets
    for (let i = 0; i < innerCategories.length; i++) {
      const start = boundaries[i];
      const end = boundaries[i + 1];
      items.push({
        label: `${innerCategories[i]} (${fmt(start)}–${fmt(end)})`,
        color: getColorForCategory(innerCategories[i]),
      });
    }

    // Upper extreme
    items.push({
      label: `${allCategories[allCategories.length - 1]} (≥ ${fmt(
        boundaries[boundaries.length - 1]
      )})`,
      color: getColorForCategory(allCategories[allCategories.length - 1]),
    });

    // N.A.
    items.push({
      label: "n.d.",
      color: NA_COLOR,
    });

    return items;
  })();

  return (
    <div className="svg-map-wrapper">
      {/* Map canvas */}
      <div className="svg-map-canvas">
        <svg
          className="svg-map"
          xmlns="http://www.w3.org/2000/svg"
          version="1.2"
          baseProfile="tiny"
          viewBox={shapes.viewBox}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <g onMouseLeave={onMapMouseLeave}>
            {shapes.locations.map((x) => {
              const pathData = data[x.id];
              let pathValue, fill, onClick, isActive;

              if (pathData) {
                pathValue = pathData.subnotification_rate;
                const pathCategory = pathData.category;
                fill = getColorForCategory(pathCategory || null);

                isActive =
                  (!selectedShapeId &&
                    !highlightedCategory &&
                    highlightedTerritories.length === 0) ||
                  (selectedShapeId && selectedShapeId === x.id) ||
                  highlightedTerritories.includes(x.id) ||
                  (highlightedCategory && highlightedCategory === pathCategory);

                onClick =
                  pathValue && onPathClick
                    ? () => onPathClick(x.id)
                    : undefined;
              } else {
                fill = NA_COLOR;
                isActive = false;
              }

              return (
                <path
                  key={x.id}
                  d={x.path}
                  onClick={onClick}
                  onMouseEnter={() => onPathMouseEnter(x.id)}
                  fill={fill}
                  stroke="white"
                  style={{
                    cursor: pathValue ? "pointer" : "auto",
                    transition: "all .2s ease-in",
                    filter: isActive ? "none" : "grayscale(1)",
                  }}
                />
              );
            })}
          </g>
        </svg>

        {/* Instructions overlay — now scoped to the map only */}
        <div className="svg-map-instructions">
          <strong>PASSE O MOUSE</strong> sobre cada bairro para destacar bairros
          com estimativas similares. <strong>CLIQUE</strong> sobre o bairro
          escolhido para saber mais sobre aquela localidade.
        </div>
        {/* Legend stays below, clean and stable */}
        {legendItems && (
          <div
            className="svg-map-legend svg-map-legend--side"
            aria-label="Legenda de categorias"
          >
            {legendItems.map((item) => (
              <div key={item.label} className="svg-map-legend-item">
                <span
                  className="svg-map-legend-swatch"
                  style={{ background: item.color }}
                />
                <span className="svg-map-legend-label">{item.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SVGMap;

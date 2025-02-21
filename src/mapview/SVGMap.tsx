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
  highlightedCategory,
  highlightedTerritories = [],
  onPathClick,
  onPathMouseEnter,
  onMapMouseLeave,
}: SVGMapProps) {
  return (
    <div className="svg-map-wrapper">
      <svg
        className="svg-map"
        xmlns="http://www.w3.org/2000/svg"
        version="1.2"
        baseProfile="tiny"
        viewBox={shapes.viewBox}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <g
          onMouseLeave={() => {
            onMapMouseLeave();
          }}
        >
          {shapes.locations.map((x) => {
            const pathData = data[x.id];
            let pathValue, fill, onClick, isActive;

            if (pathData) {
              pathValue = pathData.subnotification_rate;
              const pathCategory = pathData.category;
              fill = getColorForCategory(pathCategory || null);

              isActive = (!selectedShapeId && !highlightedCategory && highlightedTerritories.length === 0) ||
                (selectedShapeId && selectedShapeId === x.id) ||
                (highlightedTerritories || []).indexOf(x.id) > -1 ||
                (highlightedCategory && highlightedCategory === pathCategory);

              onClick = pathValue && onPathClick ? () => onPathClick(x.id) : undefined;
            } else {
              pathValue = false;
              fill = NA_COLOR;
              isActive = false;
              onClick = undefined;
            }

            return (
              <path
                key={x.id}
                d={x.path}
                onClick={onClick}
                onMouseEnter={() => {
                  onPathMouseEnter(x.id);
                }}
                fill={fill}
                stroke="white"
                style={{
                  cursor: pathValue ? "pointer" : "auto",
                  transition: 'all .2s ease-in',
                  filter: isActive ? 'none' : 'grayscale(1)'
                }}
              ></path>
            );
          })}
        </g>
      </svg>
      <p className="svg-map-instructions">
        <strong>PASSE O MOUSE</strong> sobre cada bairro para destacar bairros
        com estimativas similares. <strong>CLIQUE</strong> sobre o bairro
        escolhido para saber mais sobre aquela localidade.
      </p>
    </div>
  );
}

export default SVGMap;

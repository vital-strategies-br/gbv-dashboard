import React from 'react';

// Types
import { SVGMapProps } from "./types";
// Data
import shapes from './shapes/recife-4098pts.json';
// CSS
import './SVGMap.css';

const PALETTE = [
  "#FFF0F0",
  "#FFE1E2",
  "#FFC7C8",
  "#FFA0A2",
  "#FF5054",
  "#F53D40",
  "#E61E21",
  "#B62023",
  "#931F21",
  "#7E2021",
  "#480708"
];
const NULL_COLOR = "#d4d4d4";

function valueToHex(value: number | null, range: number = 1): string {
  if (value === null) return NULL_COLOR;
  if (value >= range) return PALETTE[PALETTE.length - 1];
  if (value <= 0) return PALETTE[0];

  const paletteSize = PALETTE.length - 1; // Subtracting 1 because the last color is reserved for 'range'
  const stepSize = range / paletteSize;
  const index = Math.min(Math.floor(value / stepSize), paletteSize);

  return PALETTE[index];
}

function SVGMap({ data, selectedShape, onPathClick }: SVGMapProps) {

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
        width={350}  
      >
        {shapes.locations.map(x => {
          const pathData = data[x.id];
          const pathValue = pathData.value;
          const fill = (!selectedShape || selectedShape === x.id) ? valueToHex(pathValue) : NULL_COLOR;
          const onClick = pathValue && onPathClick ? () => onPathClick(x.id) : undefined;

          return (
            <path key={x.id} d={x.path} onClick={onClick} fill={fill} stroke="white" style={{
              cursor: pathValue ? "pointer" : "auto"
            }}></path>
          );
        })}
      </svg>
      <div className="svg-map-instructions">
        <strong>PASSE O MOUSE</strong> sobre cada bairro para destacar bairros com estimativas similares. <strong>CLIQUE</strong> sobre o bairro escolhido para saber mais sobre aquela localidade.
      </div>
    </div>
  );
}

export default SVGMap;
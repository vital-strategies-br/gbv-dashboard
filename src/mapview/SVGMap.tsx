import React from 'react';

import './SVGMap.css';
import shapes from './shapes/recife-4098pts.json';

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

interface ShapeData {
  name: string,
  value: number | null,
}

interface SVGMapProps {
  // A mapping of shape 'id' to color
  data: { [index: number]: ShapeData },
  // The 'id' of the selected shape
  selectedShape: number | null,
  // The onShapeClick callback
  onShapeClick: (id: number) => void;
}

function valueToHex(value: number | null, range: number = 1): string {
  if (value === null) return NULL_COLOR;
  if (value >= range) return PALETTE[PALETTE.length - 1];
  if (value <= 0) return PALETTE[0];

  const paletteSize = PALETTE.length - 1; // Subtracting 1 because the last color is reserved for 'range'
  const stepSize = range / paletteSize;
  const index = Math.min(Math.floor(value / stepSize), paletteSize);

  return PALETTE[index];
}

function SVGMap({ data, selectedShape, onShapeClick }: SVGMapProps) {

  function onPathClick(id: number): void {
    if (onShapeClick) {
      onShapeClick(id);
    }
  }

  return (
    <div className="wrapper">
      <svg
        className="svg-map"
        xmlns="http://www.w3.org/2000/svg"
        version="1.2"
        baseProfile="tiny"
        viewBox={shapes.viewBox}
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        {shapes.locations.map(x => {
          let shapeData = data[x.id];
          let fill = (!selectedShape || selectedShape === x.id) ? valueToHex(shapeData.value) : NULL_COLOR
          return (
            <path d={x.path} onClick={() => onPathClick(x.id)} stroke="white" fill={fill}></path>
          );
        })}
      </svg>
    </div>
  );
}

export default SVGMap;
import React from 'react';

import './Map.css';
import shapes from './res/shapes-recife.json';

interface MapProps {
  // The 'id' of the selected shape
  selectedShape?: number,
  // A mapping of shape 'id' to color
  colors: { [index: number]: string },
  // The onShapeClick callback
  onShapeClick: (id: number) => void;
}

function Map({ colors, onShapeClick }: MapProps) {

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
          return (
            <path d={x.path} onClick={() => onPathClick(x.id)} fill={colors[x.id] || "#d4d4d4"}></path>
          );
        })}
      </svg>
    </div>
  );
}

export default Map;
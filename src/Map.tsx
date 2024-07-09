import React from 'react';
import paths from './bairros.json';

function Map() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.2"
      baseProfile="tiny"
      width="800"
      height="1136"
      viewBox="0 0 800 1136"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      {paths.locations.map(x => {
        return (
          <path d={x.path} onClick={() => alert(x.id)} stroke="black" fill="orange"></path>
        );
      })}
    </svg>
  );
}

export default Map;
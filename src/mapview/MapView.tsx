import React, { useState } from "react";
import Select from "react-select";

import SVGMap from "./SVGMap";
import SectionHeader from "../common/SectionHeader";

import data from "./data/dashboard.json";
import Demographic from "../icons/demographic.svg";

import "./MapView.css";

function MapView() {
  let [selectedNeighborhood, setSelectedNeighborhood] = useState<number | null>(
    null
  );

  function onShapeClick(id: number) {
    if (id === selectedNeighborhood) {
      setSelectedNeighborhood(null);
    } else {
      setSelectedNeighborhood(id);
    }
  }

  let filtered = Object.fromEntries(
    data.map((neighborhood) => {
      return [
        neighborhood.id_shape,
        {
          name: neighborhood.name,
          value: neighborhood.data[4].subnotification_rate,
        },
      ];
    })
  );

  let name = data.find(
    (neighborhood) => neighborhood.id_shape === selectedNeighborhood
  )?.name;

  console.log(name);

  return (
    <div className="mapview-container">
      <SectionHeader
        title="Subnotificação de violência contra mulher no município de Recife"
        subtitle="Estimativa de Subnotificação por 10.000 usuárias das atenção básica."
        iconSrc={Demographic}
        iconAlt="Icon of a group of people"
      />
      <div className="dashboard-content">
        <div className="dashboard-content-inner content">
          <div className="dashboard-block">
            <div>
              <SVGMap
                selectedShape={selectedNeighborhood}
                onShapeClick={onShapeClick}
                data={filtered}
              />
            </div>
          </div>
          <div className="dashboard-block">
            {selectedNeighborhood ? (
              <h3>{name}</h3>
            ) : (
              <>
                <p>
                  O mapa do Recife à esquerda mostra a estimativa de
                  subnotificação de casos de violência contra a mulher para cada
                  10.000 usuárias de atenção básica (AB) em cada bairro. O
                  gráfico de barras agrupa bairros em faixa de estimativa
                  similares. Ao passar o mouse sobre cada barra, destacam-se os
                  bairros com quantidades similares de possíveis casos de
                  violência não identficados pelo sistema de saúde para aquelas
                  localidades
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapView;

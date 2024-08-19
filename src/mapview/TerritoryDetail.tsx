import React, { useState } from "react";

// Types
import { HealthUnitData, TerritoryDetailProps } from "./types";
// Utils
import { formatPercentage } from "./utils";
// Image
import Close from "../icons/close.svg";
import Help from "../icons/help.svg";
// CSS
import "./TerritoryDetail.css";

const fakeUnits: HealthUnitData[] = [
  {
    name: "UBS Central",
    suspectCases: 15,
    esusUsers: 230,
  },
  {
    name: "UBS Norte",
    suspectCases: 24,
    esusUsers: 112,
  },
];

function TerritoryDetail({ data }: TerritoryDetailProps) {
  const [isHelpOpen, setIsHelpOpen] = useState<boolean>(false);

  return (
    <div className="territory-detail-container">
      <div className="territory-detail-info-box">
        <div className="territory-detail-info-box-header">
          <h3>{`Bairro ${data.name}`}</h3>
          <img
            src={Help}
            alt="Help"
            onClick={() => setIsHelpOpen(!isHelpOpen)}
          />
        </div>
        <div className="territory-detail-info-box-body">
        <div className="territory-detail-info-box-row">
          <span>Taxa de subnotificação</span>
          <span>{formatPercentage(data.subnotification_rate)}</span>
        </div>
        <div className="territory-detail-info-box-row">
          <span>Categoria</span>
          <span>{data.category}</span>
        </div>
        <div className="territory-detail-info-box-row">
          <span>Notificações</span>
          <span>{data.sinan}</span>
        </div>
        <div className="territory-detail-info-box-row">
          <span>População feminina</span>
          <span>n.d.</span>
        </div>
        </div>
      </div>

      <div className="territory-detail-units-table">
        <div className="territory-detail-units-table-header">
          <div>Unidades de Saúde</div>
          <div>Casos Suspeitos</div>
          <div>Usuárias</div>
          <div>% Casos / Usuárias</div>
        </div>
        {fakeUnits.map((healthUnitData) => (
          <div className="territory-detail-units-table-row" key={healthUnitData.name}>
            <div>{healthUnitData.name}</div>
            <div>{healthUnitData.suspectCases}</div>
            <div>{healthUnitData.esusUsers}</div>
            <div>
              {formatPercentage(
                healthUnitData.suspectCases / healthUnitData.esusUsers,
                1
              )}
            </div>
          </div>
        ))}
      </div>

      {isHelpOpen && (
        <div className="territory-detail-help-box">
          <div className="territory-detail-help-box-content">
            <p>
              <strong>Taxa de Subnotificação:</strong> Calculada a partir dos
              resultados do modelo de inteligência artificial, esta taxa é o nº
              de casos suspeitos de violência que não foram notificados dividido
              pelo total de mulheres atendidas na atenção básica.
            </p>
            <p>
              <strong>Categoria:</strong> Classificação da taxa de
              subnotificação do bairro em relação à média de casos suspeitos do
              município.
            </p>
            <p>
              <strong>Notificações:</strong> Numéro de notificações registradas
              no SINAN para o bairro atual no período selecionado.
            </p>
            <p>
              <strong>População feminina:</strong> População estimada para 2021
              com base nos dados do Censo 2010.
            </p>
          </div>
          <div className="territory-detail-help-box-close-wrapper">
            <img src={Close} alt="Close" onClick={() => setIsHelpOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

export default TerritoryDetail;

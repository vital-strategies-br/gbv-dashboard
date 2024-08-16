import React, { useState } from "react";

// Types
import { TerritoryDetailProps } from "./types";
// Utils
import { formatPercentage } from "./utils";
// Image
import Close from "../icons/close.svg";
import Help from "../icons/help.svg";
// CSS
import "./TerritoryDetail.css";

function TerritoryDetail({ data }: TerritoryDetailProps) {
  const [isHelpOpen, setIsHelpOpen] = useState<boolean>(false);

  return (
    <div className="territory-detail-container">
      <div className="territory-detail-info-box">
        <div className="territory-detail-header">
          <h3>{`Bairro ${data.name}`}</h3>
          <img
            src={Help}
            alt="Help"
            onClick={() => setIsHelpOpen(!isHelpOpen)}
          />
        </div>
        <div className="territory-detail-row">
          <span>Taxa de subnotificação</span>
          <span>{formatPercentage(data.subnotification_rate)}</span>
        </div>
        <div className="territory-detail-row">
          <span>Categoria</span>
          <span>{data.category}</span>
        </div>
        <div className="territory-detail-row">
          <span>Notificações</span>
          <span>{data.sinan}</span>
        </div>
        <div className="territory-detail-row">
          <span>População feminina</span>
          <span>n.d.</span>
        </div>
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

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
    unit_name: "UBS Central",
    suspected_cases: 15,
    esus_users: 230,
    sinan_notifications: 0,
  },
  {
    unit_name: "UBS Norte",
    suspected_cases: 24,
    esus_users: 112,
    sinan_notifications: 0,
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
            <span>População feminina</span>
            <span>{data.population}</span>
          </div>
          <div className="territory-detail-info-box-row">
            <span>Usuárias da atenção básica</span>
            <span>{data.resident_esus_users}</span>
          </div>
          <div className="territory-detail-info-box-row">
            <span>Casos suspeitos</span>
            <span>{data.resident_suspected_cases}</span>
          </div>
          <div className="territory-detail-info-box-row">
            <span>Notificações no SINAN</span>
            <span>{data.resident_sinan_notifications}</span>
          </div>
        </div>
      </div>

      {data.units.length > 0 ? (
        <div className="territory-detail-units-table">
          <div className="territory-detail-units-table-header">
            <div>Unidades de Saúde</div>
            <div>Casos Suspeitos</div>
            <div>Usuárias</div>
            <div>% Casos / Usuárias</div>
          </div>
          {data.units
            .filter((x) => x.esus_users > 0)
            .map((healthUnitData) => (
              <div
                className="territory-detail-units-table-row"
                key={healthUnitData.unit_name}
              >
                <div>{healthUnitData.unit_name}</div>
                <div>{healthUnitData.suspected_cases || 0}</div>
                <div>{healthUnitData.esus_users || 0}</div>
                <div>
                  {formatPercentage(
                    (healthUnitData.suspected_cases || 0) /
                      (healthUnitData.esus_users || 1),
                    1
                  )}
                </div>
              </div>
            ))}
        </div>
      ) : (
        <p className="territory-detail-message-no-unit">
          Não há registro de unidade de saúde localizada neste bairro.
        </p>
      )}

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
              <strong>População feminina:</strong> População estimada para 2021
              com base nos dados do Censo 2010.
            </p>
            <p>
              <strong>Usuárias da atenção básica:</strong> Número de mulheres
              que residem no bairro e possuem pelo menos um registro de
              atendimento em serviço da atenção básica no período selecionado.
            </p>
            <p>
              <strong>Casos suspeitos:</strong> Numéro de casos em que há
              padrões no prontuário eletrônico similar ao de casos notificados
              de violência.
            </p>
            <p>
              <strong>Notificações no SINAN:</strong> Numéro de notificações
              registradas no SINAN de mulheres que residem no bairro durante
              período selecionado.
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

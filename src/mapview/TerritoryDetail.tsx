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
            <span>Casos subnotificados</span>
            <span>{data.resident_underreported_cases}</span>
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
        <>
          <div className="territory-detail-backdrop" onClick={() => setIsHelpOpen(false)} />

          <div className="territory-detail-help-box">
            <div className="territory-detail-help-box-content">
              <h3 className="help-box-title">Entenda os Indicadores:</h3>

              <dl className="help-definition-list">
                <dt><strong>Taxa de Subnotificação</strong></dt>
                <dd>
                  Proporção estimada de casos suspeitos e subnotificados de violência que não foram notificados no Sinan, em relação ao total de mulheres atendidas na atenção básica. Calculada com auxílio de um modelo de inteligência artificial.
                </dd>

                <dt><strong>Categoria</strong></dt>
                <dd>
                  Classificação da subnotificação do bairro comparada à média municipal no mesmo período.
                </dd>

                <dt><strong>População feminina</strong></dt>
                <dd>
                  Estimativa com base nos dados do Censo 2010.
                </dd>

                <dt><strong>Usuárias da atenção básica</strong></dt>
                <dd>
                  Número de mulheres do bairro com pelo menos um atendimento registrado na atenção básica no período selecionado.
                </dd>

                <dt><strong>Casos subnotificados</strong></dt>
                <dd>
                  Casos em que há certeza de violência, mas não há notificação. Identificados pelo código CID de atendimentos, hospitalização ou óbito ou por identificação de relato direto de violência em prontuário com auxílio de IA de análise semântica.
                </dd>

                <dt><strong>Casos suspeitos</strong></dt>
                <dd>
                  Casos com padrões no prontuário eletrônico similares aos de casos conhedidos de violência.
                </dd>

                <dt><strong>Notificações no SINAN</strong></dt>
                <dd>
                  Registros de notificações de violência no SINAN para mulheres do bairro no período.
                </dd>
              </dl>
            </div>

            <div className="territory-detail-help-box-close-wrapper">
              <img src={Close} alt="Fechar ajuda" title="Fechar" onClick={() => setIsHelpOpen(false)} />
            </div>
          </div>
        </>
      )}


    </div>
  );
}

export default TerritoryDetail;

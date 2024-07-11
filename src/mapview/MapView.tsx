import React from 'react';

import SVGMap from './SVGMap';
import SectionHeader from '../common/SectionHeader';

import './MapView.css';

function Dashboard() {
  return (
		<div className="dashboard-viewport">
			<SectionHeader />
			<div className="dashboard-content">
				<div className="dashboard-block">
					<div></div>
					<div>
						<SVGMap onShapeClick={alert} colors={{ 3:'blue', 25: 'orange', 71: 'red' }} />
					</div>
				</div>
				<div className="dashboard-block">
					O mapa do Recife à esquerda mostra a estimativa de subnotificação de casos de 
					violência contra a mulher para cada 10.000 usuárias de atenção básica (AB) em
					cada bairro. O gráfico de barras agrupa bairros em faixa de estimativa similares.
					Ao passar o mouse sobre cada barra, destacam-se os bairros com quantidades similares
					de possíveis casos de violência não identficados pelo sistema de saúde para aquelas
					localidades.
				</div>
			</div>
		</div>
  );
}

export default Dashboard;
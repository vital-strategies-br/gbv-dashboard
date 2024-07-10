import React from 'react';
import Map from './Map';

import './Dashboard.css';

function Dashboard() {
  return (
		<div className="dashboard-viewport">
			<div className="dashboard-header">
				<h2>Subnotificação de violência contra mulher no município de Recife</h2>
				<p>Estimativa de Subnotificação por 10.000 usuárias das atenção básica.</p>
			</div>
			<div className="dashboard-content">
				<div className="dashboard-block">
					<div></div>
					<div>
						<Map onShapeClick={alert} colors={{ 3:'blue', 25: 'orange', 71: 'red' }} />
					</div>
				</div>
				<div className="dashboard-block">
					Texto
				</div>
			</div>
		</div>
  );
}

export default Dashboard;
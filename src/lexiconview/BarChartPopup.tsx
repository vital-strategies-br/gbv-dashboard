import React from 'react';

// Types
import { BarChartPopupProps } from "./types";
// CSS
import './BarChartPopup.css';

function BarChartPopup({ data, colorScale }: BarChartPopupProps) {
  const totalN = data.age_groups.reduce((sum, group) => sum + group.n, 0);

  console.log(data.age_groups);

  return (
    <div className={`barchart-popup`}>
      <div className="barchart-popup-stats">
        {data.age_groups.map((group, index) => {
          const percentage = ((group.n / totalN) * 100).toFixed(1);
          const formattedN = group.n.toLocaleString('pt-BR');
          
          return (
            <div key={index} className="barchart-popup-stat-row">
              <div 
                className="color-square"
                style={{ 
                  backgroundColor: colorScale[index],
                  width: '16px',
                  height: '16px',
                  marginRight: '8px'
                }}
              />
              <span>
                {percentage}% - {formattedN} casos - Relevância: {group.keyness.toFixed(1)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BarChartPopup; 
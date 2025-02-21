import React from 'react';
import { SEQUENTIAL_PALETTE } from './utils';
import './BarChartPopup.css';

interface BarChartPopupProps {
  data: {
    keyness: number;
    lu: string;
    age_groups: { n: number; keyness: number }[];
  };
}

function BarChartPopup({ data }: BarChartPopupProps) {
  const totalN = data.age_groups.reduce((sum, group) => sum + group.n, 0);

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
                  backgroundColor: SEQUENTIAL_PALETTE[index],
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
import React from 'react';

interface BarProps {
  value: number;
  maxDataValue: number;
  width: number;
  plotHeight: number;
  index: number;
  totalBars: number;
  yAxisLimits: Array<number>;
}

const Bar: React.FC<BarProps> = ({ value, maxDataValue, width, plotHeight, index, totalBars, yAxisLimits }) => {
  const barHeight = value * (plotHeight / yAxisLimits[1]); // Adjust height for padding
  const barWidth = width / totalBars; // Adjust width for padding between bars

  const getColor = (value: number) => {
    if (value > 30) return 'darkred';
    if (value > 20) return 'red';
    if (value > 10) return 'lightcoral';
    return 'gray';
};

  return (
    <g transform={`translate(${index * (width / totalBars)}, ${plotHeight - barHeight})`}>
      <rect
        x="0"
        y="0"
        width={barWidth}
        height={barHeight}
        fill={getColor(value)}
      />
      {/* <text
        x={barWidth / 2}
        y={barHeight + 15}
        textAnchor="middle"
        fontSize="10"
        fill="black"
      >
        {value}
      </text> */}
    </g>
  );
};

export default Bar;

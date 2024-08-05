import React from "react";

import { BarChartProps } from "./types";
import "./BarChart.css";

const MAX_VALUE = 1;
const BINS = 25;
const YLIM = [0, 30];

function linspace(
  start: number,
  end: number,
  num: number,
  roundSteps: boolean = false
): number[] {
  const result = [];
  const totalRange = end - start;
  let step = totalRange / (num - 1);
  if (roundSteps) {
    step = Math.round(step);
  }
  for (let i = 0; i < num; i++) {
    result.push(start + step * i);
  }
  return result;
}

interface BarProps {
  value: number;
  maxDataValue: number;
  width: number;
  plotHeight: number;
  index: number;
  totalBars: number;
  yAxisLimits: Array<number>;
}

function Bar({
  value,
  maxDataValue,
  width,
  plotHeight,
  index,
  totalBars,
  yAxisLimits,
}: BarProps) {
  const barHeight = value * (plotHeight / yAxisLimits[1]); // Adjust height for padding
  const barWidth = width / totalBars; // Adjust width for padding between bars

  const getColor = (value: number) => {
    if (value > 30) return "darkred";
    if (value > 20) return "red";
    if (value > 10) return "lightcoral";
    return "gray";
  };

  return (
    <g
      transform={`translate(${index * (width / totalBars)}, ${
        plotHeight - barHeight
      })`}
    >
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
}

interface AxisGridTicksProps {
    axis: 'x' | 'y';
    limits: [number, number];
    numTicks: number;
    chartAreaLength: number;
    chartAreaOther: number;
    chartMargin: number;
  }

// function AxisGridTicks({axis, limits, numTicks = 5, chartAreaLength, chartAreaOther, chartMargin}: AxisGridTicksProps)  {
//     return (
//         <g className={`${axis}-grid-ticks`}>
//             {linspace(limits[0], limits[1], numTicks).map((value) => {
//                 const percentage = 0;
//             })}
//         </g>
//     )
// }

function BarChart({ data, width = 600, height = 350 }: BarChartProps) {
  const values = Object.values(data).map((x) => x.subnotification_rate);

  let nullCount = 0;
  const binSize = MAX_VALUE / BINS;
  const binCounts = new Array(BINS).fill(0);

  for (const value of values) {
    if (value === null) nullCount++;
    else binCounts[Math.min(Math.floor(value / binSize), BINS - 1)]++;
  }

  const chartMarginLeft = 70;
  const chartMarginBottom = 70;

  const chartAreaWidth = width - chartMarginLeft;
  const chartAreaHeight = height - chartMarginBottom;

  console.log(binCounts);

  return (
    <svg
      width="100%"
      height={350}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMin"
    >
      {/* <g>
        {binCounts.map((count, index) => (
          <Bar
            key={index}
            value={count}
            maxDataValue={MAX_VALUE}
            width={width}
            plotHeight={height}
            index={index}
            totalBars={binCounts.length}
            yAxisLimits={YLIM}
          />
        ))}
      </g> */}
      <g className="y-grid-ticks">
        {linspace(YLIM[0], YLIM[1], 5, true).map((value) => {
          const heightAsPercentage = value / YLIM[1];
          // We subtract 30 pixels from the height to have room for the grid labels
          const heightInPixels = heightAsPercentage * (chartAreaHeight - 30);
          const y = chartAreaHeight - heightInPixels;

          return (
            <g key={value}>
              <line
                x1={chartMarginLeft}
                y1={y}
                x2={width}
                y2={y}
              />
              <text x={chartMarginLeft-10} y={y}>
                {value}
              </text>
            </g>
          );
        })}
      </g>
      <g className="x-grid-ticks">
        {linspace(0, MAX_VALUE, 5).map((value) => {
          const widthAsPercentage = value / MAX_VALUE;
          const widthtInPixels = widthAsPercentage * (chartAreaWidth - 30);
          const x = chartMarginLeft + widthtInPixels;

          return (
            <text x={x + 10} y={chartAreaHeight + 30} textAnchor="start">
              {value}
            </text>
          );
        })}
      </g>
      <text
        x={chartAreaWidth / 2 + chartMarginLeft}
        y={height - 4}
        textAnchor="middle"
        fontSize="14"
      >
        Número estimado de casos subnotificados por 10 mil usuárias AB
      </text>
      <text
        x={-height / 2}
        y={16}
        textAnchor="middle"
        fontSize="14"
        transform="rotate(-90)"
      >
        Número de Bairros
      </text>
    </svg>
  );
}

export default BarChart;

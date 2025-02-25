import React from "react";

// Types
import { LineChartProps } from "./types";
// Components
import AxisGridTicks from "../common/AxisGridTicks";
// Utils
import { generateTickRange } from "../common/utils";
// CSS
import "./LineChart.css";

function LineChart({
  data,
  width = 800,
  height = 400,
  xAxisLimits = [-180, 180],
  yAxisLimits = [0, 1],
  annotations,
}: LineChartProps) {
  // Margins for the drawable area
  const chartMarginLeft = 70;
  const chartMarginBottom = 130;
  const xAxisOffSet = 32;

  // Calculate drawable area dimensions
  const chartAreaWidth = width - chartMarginLeft;
  const chartAreaHeight = height - chartMarginBottom;

  const xAxisPixelsPerUnit =
    (chartAreaWidth - 2 * xAxisOffSet) / (xAxisLimits[1] - xAxisLimits[0]);
  const yAxisPixelsPerUnit =
    chartAreaHeight / (yAxisLimits[1] - yAxisLimits[0]);

  const xTickRange = generateTickRange(xAxisLimits[0], xAxisLimits[1], 10, [
    30,
  ]);
  const yTickRange = generateTickRange(
    yAxisLimits[0],
    yAxisLimits[1],
    6,
    [0.1, 0.2, 0.3]
  );

  // Compute the line path
  const d = data
    .sort((a, b) => a[0] - b[0])
    .map((point, index) => {
      const x =
        xAxisPixelsPerUnit * (point[0] - xAxisLimits[0]) +
        chartMarginLeft +
        xAxisOffSet;
      const y =
        chartAreaHeight - yAxisPixelsPerUnit * (point[1] - yAxisLimits[0]);
      return index === 0 ? `M${x} ${y}` : `L${x} ${y}`;
    })
    .join(" ");

  return (
    <svg width={width} height={height} className="linechart">
      <g>
        <AxisGridTicks
          axis="x"
          ticks={xTickRange.ticks}
          axisLength={chartAreaWidth}
          otherLength={chartAreaHeight}
          startMargin={chartMarginLeft}
          axisStartOffset={xAxisOffSet}
          axisEndOffset={xAxisOffSet}
          showLines={true}
        />
        <AxisGridTicks
          axis="y"
          ticks={yTickRange.ticks}
          axisLength={chartAreaHeight}
          otherLength={chartAreaWidth}
          startMargin={chartMarginLeft}
          showLines={true}
        />
        <path d={d} stroke="#4766ff" strokeWidth={3} fill="none" />
        {annotations &&
          annotations.map((anno) => {
            console.log(anno);
            if (typeof anno.xPos === "number") {
              const x =
                xAxisPixelsPerUnit * (anno.xPos - xAxisLimits[0]) +
                chartMarginLeft +
                xAxisOffSet;
              return (
                <g key={anno.text}>
                  <line
                    x1={x}
                    x2={x}
                    y1={chartAreaHeight}
                    y2={-36}
                    stroke="#464646"
                    strokeWidth={3}
                    stroke-dasharray="3 3"
                  />
                  <text x={x + 8} y={-16} className="linechart-label">
                    {anno.text}
                  </text>
                </g>
              );
            }
          })}
        <text
          x={chartAreaWidth / 2 + chartMarginLeft}
          y={height - 56}
          textAnchor="middle"
          className="linechart-label"
        >
          Diferença em dias para a violência
        </text>
        <text
          x={-(height - chartMarginBottom) / 2}
          y={16}
          textAnchor="middle"
          transform="rotate(-90)"
          className="linechart-label"
        >
          Prob. de aumento dos atendimentos
        </text>
      </g>
    </svg>
  );
}

export default LineChart;

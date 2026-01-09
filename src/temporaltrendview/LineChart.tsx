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
  width = 700,
  height = 450,
  xAxisLimits = [-180, 180],
  yAxisLimits = [20, 100],
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
    [10, 20, 30]
  );

  // Step 1: Convert data points to (x, y) coordinates
  const points = data
    .sort((a, b) => a[0] - b[0])
    .map((point) => ({
      x:
        xAxisPixelsPerUnit * (point[0] - xAxisLimits[0]) +
        chartMarginLeft +
        xAxisOffSet,
      y: chartAreaHeight - yAxisPixelsPerUnit * (point[1] - yAxisLimits[0]),
    }));

  // Step 2: Construct the SVG path string using quadratic Bézier curves
  const d = points
    .map((point, index, arr) => {
      if (index === 0) return `M${point.x} ${point.y}`;

      const prev = arr[index - 1];
      const midX = (prev.x + point.x) / 2;
      const midY = (prev.y + point.y) / 2;

      return `Q${prev.x} ${prev.y}, ${midX} ${midY}`;
    })
    .join(" ");

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet" className="linechart">
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
        <path d={d} stroke="#121E87" strokeWidth={3} fill="none" />
        {annotations &&
          annotations.map((anno) => {
            if (typeof anno.xPos === "number") {
              const x =
                xAxisPixelsPerUnit * (anno.xPos - xAxisLimits[0]) +
                chartMarginLeft +
                xAxisOffSet;
              let anchor, offset;
              if (anno.xPos >= -50 && anno.xPos < 0) {
                anchor = "end";
                offset = -8;
              } else {
                anchor = "start";
                offset = 8;
              }
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
                  <text
                    x={x + offset}
                    y={-16}
                    className="linechart-label"
                    textAnchor={anchor}
                  >
                    {anno.text}
                  </text>
                </g>
              );
            } else {
              return <></>
            }
          })}
        <text
          x={chartAreaWidth / 2 + chartMarginLeft}
          y={height - 56}
          textAnchor="middle"
          className="linechart-label"
        >
          Dia em relação a identificação da violência
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

import React from "react";

// Components
import AxisGridTicks from "../common/AxisGridTicks";
// Types
import { BarProps, BarChartProps } from "./types";
// CSS
import "./BarChart.css";

function Bar({ x, y, width, height, fill = "#4299e1" }: BarProps) {
  // For negative values, we need to adjust the y position and height
  const barY = height >= 0 ? y : y + height;
  const barHeight = Math.abs(height);

  return <rect x={x} y={barY} width={width} height={barHeight} fill={fill} />;
}

function BarChart({ data, width = 900, height = 400 }: BarChartProps) {
  // The tick limits being rendered for the chart (axis y)
  const allKeyness = data.map((x) => x.keyness);
  const limits: [number, number] = [
    Math.floor(Math.min(...allKeyness) - 2),
    Math.ceil(Math.max(...allKeyness) + 2),
  ];

  // These are the margins of the drawable area (excluding labels)
  const chartMarginLeft = 70;
  const chartMarginBottom = 140;
  // Updated areas
  const chartAreaWidth = width - chartMarginLeft;
  const chartAreaHeight = height - chartMarginBottom;

  // Bar dimensions
  const minGap = 20;
  const barWidth = Math.min(
    (chartAreaWidth - minGap * (data.length + 1)) / data.length,
    50
  );
  const barGap = (chartAreaWidth - barWidth * data.length) / (data.length + 1);

  // Calculate pixels per unit for the y-axis
  const pixelsPerUnit = chartAreaHeight / (limits[1] - limits[0]);
  const zeroYPosition = chartAreaHeight - -limits[0] * pixelsPerUnit;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMin"
      className="lexicon-barchart"
    >
      <AxisGridTicks
        axis="y"
        limits={limits}
        numTicks={10}
        axisLength={chartAreaHeight}
        otherLength={chartAreaWidth}
        startMargin={chartMarginLeft}
        // roundingMode="half"
        showLines
      />
      <g className="barchart-bars">
        {data.map((keynessData, index) => {
          const x = chartMarginLeft + barGap + index * (barWidth + barGap);
          const barHeight = -keynessData.keyness * pixelsPerUnit; // Negative because SVG Y grows downward
          const textX = x + barWidth / 2 + 16;
          const textY = height - chartMarginBottom + 16;
          return (
            <g key={keynessData.lu}>
              <Bar
                x={x}
                y={zeroYPosition}
                width={barWidth}
                height={barHeight}
                fill="#4299e1"
              />
              <text
                x={textX}
                y={textY}
                textAnchor="end"
                transform={`rotate(-45, ${textX}, ${textY})`}
                className="barchart-label"
              >
                {keynessData.lu}
              </text>
            </g>
          );
        })}
      </g>
      <text
        x={chartAreaWidth / 2 + chartMarginLeft}
        y={height - 4}
        textAnchor="middle"
        className="barchart-label"
      >
        Item lexical
      </text>
      <text
        x={-height / 2}
        y={16}
        textAnchor="middle"
        transform="rotate(-90)"
        className="barchart-label"
      >
        Relevância
      </text>
    </svg>
  );
}

export default BarChart;

import React from "react";

import { BarChartProps } from "./types";
import "./BarChart.css";

const MAX_VALUE = 1;
const BINS = 25;
const YLIM: [number, number] = [0, 30];

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

interface AxisGridTicksProps {
  axis: "x" | "y";
  limits: [number, number];
  numTicks?: number;
  axisLength: number;
  otherLength: number;
  startMargin: number;
  axisStartOffset?: number;
  axisEndOffset?: number;
  showLines?: boolean;
  roundSteps?: boolean;
}

function AxisGridTicks({
  axis,
  limits,
  numTicks = 5,
  axisLength,
  otherLength,
  startMargin,
  axisStartOffset = 0,
  axisEndOffset = 0,
  showLines = false,
  roundSteps = false,
}: AxisGridTicksProps) {
  const tickPositions = linspace(limits[0], limits[1], numTicks, roundSteps);

  return (
    <g className={`${axis}-grid-ticks`}>
      {tickPositions.map((value) => {
        const lengthPercentage = (value - limits[0]) / limits[1];
        const lengthInPixels =
          lengthPercentage * (axisLength - axisStartOffset - axisEndOffset) +
          axisStartOffset;
        let x1: number,
          y1: number,
          x2: number,
          y2: number,
          textOffsetX: number,
          textOffsetY: number,
          anchor: string;

        if (axis === "x") {
          x1 = lengthInPixels + startMargin;
          x2 = x1;
          y1 = otherLength;
          y2 = 0;
          textOffsetX = 0;
          textOffsetY = 30;
          anchor = "middle";
        } else {
          x1 = startMargin;
          x2 = startMargin + otherLength;
          y1 = axisLength - lengthInPixels;
          y2 = y1;
          textOffsetX = -10;
          textOffsetY = 0;
          anchor = "end";
        }

        return (
          <g key={value}>
            {showLines && <line x1={x1} y1={y1} x2={x2} y2={y2} />}
            <text x={x1 + textOffsetX} y={y1 + textOffsetY} textAnchor={anchor}>
              {roundSteps ? value : value.toFixed(2).replace(/(\.00)|0$/, "")}
            </text>
          </g>
        );
      })}
    </g>
  );
}

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

  // We subtract 30 to have some padding for tick labels
  const chartAreaWidth = width - chartMarginLeft;
  const chartAreaHeight = height - chartMarginBottom;

  const naBarHeight = nullCount * (chartAreaHeight / YLIM[1]);

  return (
    <svg
      width="100%"
      height={350}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMin"
    >
      <AxisGridTicks
        axis="x"
        limits={[0, MAX_VALUE]}
        axisLength={chartAreaWidth}
        otherLength={chartAreaHeight}
        startMargin={chartMarginBottom}
        axisStartOffset={16 + 32 + 48}
        axisEndOffset={32}
      />
      <AxisGridTicks
        axis="y"
        limits={[YLIM[0], YLIM[1] - 5]}
        axisLength={chartAreaHeight}
        otherLength={chartAreaWidth}
        startMargin={chartMarginLeft}
        showLines
        roundSteps
      />
      <g className="barchart-bar-na">
        <rect
          x={16 + chartMarginLeft}
          y={chartAreaHeight - naBarHeight}
          width="32"
          height={naBarHeight}
        />
        <text
          x={16 + chartMarginLeft + 16}
          y={chartAreaHeight + 30}
          textAnchor="middle"
        >
          n.d.
        </text>
      </g>
      <text
        x={chartAreaWidth / 2 + chartMarginLeft}
        y={height - 4}
        className="barchart-label"
      >
        Número estimado de casos subnotificados por 10 mil usuárias AB
      </text>
      <text
        x={-height / 2}
        y={16}
        transform="rotate(-90)"
        className="barchart-label"
      >
        Número de Bairros
      </text>
    </svg>
  );
}

export default BarChart;

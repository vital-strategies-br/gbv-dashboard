import React from "react";

import { BarChartProps, HistogramBarProps, AxisGridTicksProps } from "./types";
import "./HistogramChart.css";

function generateLinearSpace(
  startValue: number,
  endValue: number,
  numPoints: number,
  shouldRoundSteps: boolean = false
): number[] {
  const pointsArray = [];
  const range = endValue - startValue;
  let stepSize = range / (numPoints - 1);
  if (shouldRoundSteps) {
    stepSize = Math.round(stepSize);
  }
  for (let pointIndex = 0; pointIndex < numPoints; pointIndex++) {
    pointsArray.push(startValue + stepSize * pointIndex);
  }
  return pointsArray;
}

function getHistogramData(
  values: Array<number | null>,
  bins: number,
  limits: [number, number]
): [number[], number] {
  let nullCount = 0;
  const binSize = (limits[1] - limits[0]) / bins;
  const binCounts = new Array(bins).fill(0);

  for (const value of values) {
    if (value === null) {
      nullCount++;
    } else if (value >= limits[1]) {
      binCounts[bins - 1]++;
    } else if (value <= limits[0]) {
      binCounts[0]++;
    } else {
      binCounts[Math.floor((value - limits[0]) / binSize)]++;
    }
  }

  return [binCounts, nullCount];
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
  const tickPositions = generateLinearSpace(
    limits[0],
    limits[1],
    numTicks,
    roundSteps
  );

  return (
    <g className={`${axis}-grid-ticks`}>
      {tickPositions.map((value) => {
        const lengthPercentage = (value - limits[0]) / (limits[1] - limits[0]);
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

function HistogramBar({ x, y, width, value, scale }: HistogramBarProps) {
  const height = value * scale;
  return <rect x={x} y={y - height} width={width} height={height} />;
}

function HistogramChart({
  data,
  bins,
  xAxisLimits,
  yAxisLimits,
  width = 600,
  height = 350,
}: BarChartProps) {
  // These are the margins of the drawable area (excluding labels)
  const chartMarginLeft = 70;
  const chartMarginBottom = 70;
  // Updated areas
  const chartAreaWidth = width - chartMarginLeft;
  const chartAreaHeight = height - chartMarginBottom;
  // Other margins
  const nullBarMarginLeft = 16;
  const nullBarMarginRight = 48;
  const nullBarWidth = 32;
  const xAxisMarginLeft = nullBarMarginLeft + nullBarWidth + nullBarMarginRight;
  const xAxisMarginRight = 32;

  const binWidth =
    (chartAreaWidth - (xAxisMarginLeft + xAxisMarginRight)) / bins;
  const yAxisScale = chartAreaHeight / (yAxisLimits[1] - yAxisLimits[0]);

  const dataValues = Object.values(data).map((x) => x.subnotification_rate);
  const [binCounts, nullCount] = getHistogramData(
    dataValues,
    bins,
    xAxisLimits
  );

  return (
    <svg
      width="100%"
      height={350}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMin"
    >
      <AxisGridTicks
        axis="x"
        limits={xAxisLimits}
        axisLength={chartAreaWidth}
        otherLength={chartAreaHeight}
        startMargin={chartMarginBottom}
        axisStartOffset={xAxisMarginLeft}
        axisEndOffset={xAxisMarginRight}
      />
      <AxisGridTicks
        axis="y"
        limits={yAxisLimits}
        axisLength={chartAreaHeight}
        otherLength={chartAreaWidth}
        startMargin={chartMarginLeft}
        showLines
        roundSteps
      />
      <g className="barchart-bar-na">
        <HistogramBar
          x={chartMarginLeft + nullBarMarginLeft}
          y={chartAreaHeight}
          width={nullBarWidth}
          value={nullCount}
          scale={yAxisScale}
        />
        <text
          x={chartMarginLeft + nullBarMarginLeft + nullBarWidth / 2}
          y={chartAreaHeight + 30}
          textAnchor="middle"
        >
          n.d.
        </text>
      </g>
      <g className="barchar-bars">
        {binCounts.map((count, index) => (
          <HistogramBar
            key={index}
            x={chartMarginLeft + xAxisMarginLeft + index * binWidth}
            y={chartAreaHeight}
            width={binWidth}
            value={count}
            scale={yAxisScale}
          />
        ))}
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

export default HistogramChart;

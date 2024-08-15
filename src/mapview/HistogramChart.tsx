import React, { useState, useEffect } from "react";

// Types
import {
  HistogramChartProps,
  HistogramBarProps,
  AxisGridTicksProps,
} from "./types";
// Utils
import { generateLinearSpace, getColorForCategory } from "./utils";
// CSS
import "./HistogramChart.css";

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

function HistogramBar({
  x,
  y,
  width,
  scale,
  value,
  category = null,
  isActive = true,
  onMouseEnter,
  onMouseLeave,
}: HistogramBarProps) {
  const [height, setHeight] = useState(0);
  const color = getColorForCategory(category);

  useEffect(() => {
    setHeight(value * scale);
  }, [value, scale]);

  return (
    <rect
      x={x}
      y={y - height}
      width={width}
      height={height}
      fill={color}
      stroke="transparent"
      onMouseEnter={() => onMouseEnter && onMouseEnter(category)}
      onMouseLeave={onMouseLeave}
      style={{
        transition: "all .2s ease-in",
        filter: !isActive ? "opacity(30%)" : undefined,
      }}
    />
  );
}

function HistogramChart({
  binCounts,
  binCategories,
  nullCount,
  xAxisLimits,
  yAxisLimits,
  width = 600,
  height = 350,
  highlightedCategory,
  onBarMouseEnter,
  onBarMouseLeave,
}: HistogramChartProps) {
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
    (chartAreaWidth - (xAxisMarginLeft + xAxisMarginRight)) / binCounts.length;
  const yAxisScale = chartAreaHeight / (yAxisLimits[1] - yAxisLimits[0]);

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
        {binCounts.map((count, index) => {
          const category = binCategories ? binCategories[index] : null;
          const isActive =
            !highlightedCategory || highlightedCategory === category;

          return (
            <HistogramBar
              key={index}
              x={chartMarginLeft + xAxisMarginLeft + index * binWidth}
              y={chartAreaHeight}
              width={binWidth}
              scale={yAxisScale}
              value={count}
              category={category}
              isActive={isActive}
              onMouseEnter={onBarMouseEnter}
              onMouseLeave={onBarMouseLeave}
            />
          );
        })}
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

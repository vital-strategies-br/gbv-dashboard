import React, { useState, useEffect } from "react";

// Components
import AxisGridTicks from "../common/AxisGridTicks";
// Types
import {
  HistogramChartProps,
  HistogramBarProps,
} from "./types";
// Utils
import { getColorForCategory } from "./utils";
import { generateTickRange } from "../common/utils";
// CSS
import "./HistogramChart.css";

function HistogramBar({
  x,
  y,
  width,
  scale,
  value,
  index,
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
      stroke="white"
      onMouseEnter={() => onMouseEnter && onMouseEnter(index)}
      onMouseLeave={onMouseLeave}
      className="histogram-bar"
      style={{
        transition: 'all .2s ease-in',
        filter: isActive ? 'none' : 'grayscale(1)'
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
  highlightedBin,
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

  // Generate tick ranges for both axes
  const xTickRange = generateTickRange(xAxisLimits[0], xAxisLimits[1], 6, [100, 500, 1000, 2000]);
  const yTickRange = generateTickRange(yAxisLimits[0], yAxisLimits[1]);

  const binWidth =
    (chartAreaWidth - (xAxisMarginLeft + xAxisMarginRight)) / binCounts.length;
  const yAxisScale = chartAreaHeight / (yTickRange.max - yTickRange.min);

  return (
    <svg
      width="100%"
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMin"
      className="mapview-histogram"
    >
      <AxisGridTicks
        axis="x"
        ticks={xTickRange.ticks}
        axisLength={chartAreaWidth}
        otherLength={chartAreaHeight}
        startMargin={chartMarginLeft}
        axisStartOffset={xAxisMarginLeft}
        axisEndOffset={xAxisMarginRight}
        roundingMode="integer"
      />
      <AxisGridTicks
        axis="y"
        ticks={yTickRange.ticks}
        axisLength={chartAreaHeight}
        otherLength={chartAreaWidth}
        startMargin={chartMarginLeft}
        roundingMode="integer"
        showLines
      />
      <g className="histogram-bar-na">
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
      <g className="histogram-bars">
        {binCounts.map((count, index) => {
          const category = binCategories ? binCategories[index] : null;
          const isActive =
            (!highlightedCategory && !highlightedBin) ||
            highlightedCategory === category ||
            highlightedBin === index;

          return (
            <HistogramBar
              key={index}
              x={chartMarginLeft + xAxisMarginLeft + index * binWidth}
              y={chartAreaHeight}
              width={binWidth}
              scale={yAxisScale}
              value={count}
              index={index}
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
        className="histogram-label"
      >
        Número estimado de casos suspeitos por 10 mil usuárias AB
      </text>
      <text
        x={-height / 2}
        y={16}
        transform="rotate(-90)"
        className="histogram-label"
      >
        Número de Bairros
      </text>
    </svg>
  );
}

export default HistogramChart;

export {
  AxisGridTicks
};
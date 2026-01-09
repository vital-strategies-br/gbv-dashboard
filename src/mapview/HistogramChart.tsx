import React, { useState, useEffect } from "react";

// Components
import AxisGridTicks from "../common/AxisGridTicks";
// Types
import { HistogramChartProps, HistogramBarProps } from "./types";
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
  xRangeLabel,
}: HistogramBarProps) {
  const [height, setHeight] = useState(0);
  const [hovered, setHovered] = useState(false);
  const color = getColorForCategory(category);

  useEffect(() => {
    setHeight(value * scale);
  }, [value, scale]);

  const centerX = x + width / 2;
  const yValueLabelY = y - height - 4;
  const xRangeLabelY = y + 30;
  
  const bgPadding = 4;
  const bgWidth = 110;
  const bgHeight = 20;

  return (
    <g
      className="histogram-bar-group"
      onMouseEnter={() => {
        setHovered(true);
        onMouseEnter?.(index);
      }}
      onMouseLeave={() => {
        setHovered(false);
        onMouseLeave?.();
      }}
      style={{
        transition: "all .2s ease-in",
        filter: isActive ? "none" : "grayscale(1)",
      }}
    >
      <rect
        x={x}
        y={y - height}
        width={width}
        height={height}
        fill={color}
        stroke="white"
        className="histogram-bar"
      />

      {/* Show Y (count) above the bar */}
      {hovered && value != null && (
        <text
          x={centerX}
          y={yValueLabelY}
          className="histogram-hover-label"
          style={{ pointerEvents: "none" }}
        >
          {value}
        </text>
      )}

      {/* X RANGE */}
      {hovered && xRangeLabel && (
        <g style={{ pointerEvents: "none" }}>
          <rect
            x={centerX - bgWidth / 2}
            y={xRangeLabelY - bgHeight + bgPadding}
            width={bgWidth}
            height={bgHeight}
            rx={2}
            ry={2}
            fill="rgba(255,255,255,0.9)"
            className="histogram-bar-xrange-bg"
          />
          <text
            x={centerX}
            y={xRangeLabelY}
            className="histogram-hover-label"
          >
            {xRangeLabel}
          </text>
        </g>
      )}
    </g>
  );
}

function HistogramChart({
  binCounts,
  binCategories,
  nullCount,
  xAxisLimits,
  yAxisLimits,
  avgValue,
  medianValue,
  width = 600,
  height = 400,
  highlightedCategory,
  highlightedBin,
  onBarMouseEnter,
  onBarMouseLeave,
}: HistogramChartProps) {
  // These are the margins of the drawable area (excluding labels)
  const chartMarginLeft = 70;
  const chartMarginBottom = 100;
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
  const xTickRange = generateTickRange(
    xAxisLimits[0],
    xAxisLimits[1],
    6,
    [100, 500, 1000, 2000]
  );
  const yTickRange = generateTickRange(yAxisLimits[0], yAxisLimits[1]);

  const binWidth =
    (chartAreaWidth - (xAxisMarginLeft + xAxisMarginRight)) / binCounts.length;
  const yAxisScale = chartAreaHeight / (yTickRange.max - yTickRange.min);

  // Match AxisGridTicks x mapping to compute bin ranges
  const xDomainMin = xTickRange.ticks[0];
  const xDomainMax = xTickRange.ticks[xTickRange.ticks.length - 1];
  const xDomainRange = xDomainMax - xDomainMin;

  const xPixelStart = chartMarginLeft + xAxisMarginLeft;
  const xPixelRange = chartAreaWidth - xAxisMarginLeft - xAxisMarginRight;

  const pxToValue = (px: number) =>
    xDomainMin + ((px - xPixelStart) / xPixelRange) * xDomainRange;

  const fmt0 = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 });

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
          xRangeLabel="n.d."
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

          const barX = chartMarginLeft + xAxisMarginLeft + index * binWidth;
          const binStart = pxToValue(barX);
          const binEnd = pxToValue(barX + binWidth);
          const xRangeLabel = `${fmt0.format(binStart)}–${fmt0.format(binEnd)}`;

          return (
            <HistogramBar
              key={index}
              x={barX}
              y={chartAreaHeight}
              width={binWidth}
              scale={yAxisScale}
              value={count}
              index={index}
              category={category}
              isActive={isActive}
              xRangeLabel={xRangeLabel}
              onMouseEnter={onBarMouseEnter}
              onMouseLeave={onBarMouseLeave}
            />
          );
        })}
      </g>

      <text
        x={chartAreaWidth / 2 + chartMarginLeft}
        y={height - 30}
        className="histogram-label"
      >
        Número estimado de casos prováveis por 10 mil usuárias APS
      </text>

      {avgValue != null && medianValue != null && (
        <text
          x={chartAreaWidth / 2 + chartMarginLeft}
          y={height}
          className="histogram-label histogram-label-sub"
        >
          (média = {Math.round(avgValue)} • mediana = {Math.round(medianValue)})
        </text>
      )}

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

export { AxisGridTicks };

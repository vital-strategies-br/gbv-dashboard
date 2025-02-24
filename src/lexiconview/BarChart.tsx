import React, { useState, useEffect } from "react";

// Components
import AxisGridTicks from "../common/AxisGridTicks";
import BarChartPopup from "./BarChartPopup";
// Types
import { BarProps, BarChartProps } from "./types";
// Utils
import { generateTickRange } from "../common/utils";
import { SEQUENTIAL_PALETTE } from "./utils";
// CSS
import "./BarChart.css";

function Bar({
  x,
  y,
  width,
  height,
  ageGroups,
  colorScale,
  ageGroupLabels,
}: BarProps & {
  ageGroups: { n: number }[];
  colorScale: Record<string, string>;
  ageGroupLabels: string[];
}) {
  const totalN = ageGroups.reduce((sum, group) => sum + group.n, 0);
  const isNegative = height > 0; // In SVG, positive height means going down
  let currentY = y;

  // For negative values, reverse the order to maintain consistent visual order
  const orderedGroups = isNegative ? [...ageGroups].reverse() : ageGroups;
  const orderedLabels = isNegative
    ? [...ageGroupLabels].reverse()
    : ageGroupLabels;

  return (
    <>
      {orderedGroups.map((group, index) => {
        const proportion = group.n / totalN;
        const sectionHeight = Math.abs(height) * proportion;

        const sectionY = isNegative ? currentY : currentY - sectionHeight;
        currentY = isNegative
          ? currentY + sectionHeight
          : currentY - sectionHeight;

        return (
          <rect
            key={index}
            x={x}
            y={sectionY}
            width={width}
            height={sectionHeight}
            fill={colorScale[orderedLabels[index]]}
          />
        );
      })}
    </>
  );
}

function BarChart({
  data,
  ageGroupLabels,
  width = 900,
  height = 400,
}: BarChartProps) {
  const [selectedBarIndex, setSelectedBarIndex] = useState<number | null>(null);

  // Get data range and generate ticks
  const allKeyness = data.map((x) => x.keyness);
  const dataMin = Math.min(...allKeyness);
  const dataMax = Math.max(...allKeyness);

  const tickRange = generateTickRange(dataMin, dataMax);
  const limits: [number, number] = [tickRange.min, tickRange.max];

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

  // Calculate pixels per unit using the extended range
  const pixelsPerUnit = chartAreaHeight / (limits[1] - limits[0]);
  const zeroYPosition = chartAreaHeight - -limits[0] * pixelsPerUnit;

  // Legend configuration
  const legendBoxSize = 180;
  const legendX = width - legendBoxSize; // Position from right
  const legendY = -8;

  // Create a mapping of labels to colors with even distribution
  const colorScale = Object.fromEntries(
    ageGroupLabels.map((label, i) => [
      label,
      SEQUENTIAL_PALETTE[Math.floor((i * (SEQUENTIAL_PALETTE.length - 1)) / (ageGroupLabels.length - 1))],
    ])
  );

  const handleBarClick = (event: React.MouseEvent, index: number) => {
    event.stopPropagation();
    if (index !== selectedBarIndex) {
      setSelectedBarIndex(index);
    } else {
      setSelectedBarIndex(null);
    }
  };

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest(".barchart-popup")) {
        setSelectedBarIndex(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

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
        ticks={tickRange.ticks}
        axisLength={chartAreaHeight}
        otherLength={chartAreaWidth}
        startMargin={chartMarginLeft}
        showLines
      />
      <g className="barchart-bars">
        {data.map((keynessData, index) => {
          const x = chartMarginLeft + barGap + index * (barWidth + barGap);
          const barHeight = -keynessData.keyness * pixelsPerUnit;
          const textX = x + barWidth / 2 + 16;
          const textY = height - chartMarginBottom + 16;

          return (
            <g
              key={keynessData.lu}
              onClick={(e) => handleBarClick(e, index)}
              style={{
                cursor: "pointer",
                filter: selectedBarIndex === null || selectedBarIndex === index ? "none" : "grayscale(1)",
                transition: "filter 0.2s ease"
              }}
            >
              <Bar
                x={x}
                y={zeroYPosition}
                width={barWidth}
                height={barHeight}
                ageGroups={keynessData.age_groups}
                colorScale={colorScale}
                ageGroupLabels={ageGroupLabels}
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
      <g className="legend">
        <rect
          x={legendX}
          y={legendY}
          width={legendBoxSize}
          height={ageGroupLabels.length * 24 + 8}
          rx={4} // Rounded corners
        />
        {ageGroupLabels.map((label, index) => (
          <g
            key={label}
            transform={`translate(${legendX + 12}, ${
              legendY + 8 + index * 24
            })`}
          >
            <rect width={32} height={16} fill={colorScale[label]} />
            <text x={40} y={13} className="legend-label">
              {label}
            </text>
          </g>
        ))}
      </g>
      <g>
        {selectedBarIndex !== null &&
          (() => {
            const POPUP_WIDTH = 260;
            const barX =
              chartMarginLeft + barGap + selectedBarIndex * (barWidth + barGap);

            // Check if popup would overflow the SVG width
            const wouldOverflow = barX + barWidth + 8 + POPUP_WIDTH > width;

            // Calculate x position based on overflow
            const xPosition = wouldOverflow
              ? barX - 8 - POPUP_WIDTH // Place on left side of bar
              : barX + barWidth + 16; // Place on right side of bar

            return (
              <foreignObject
                x={xPosition}
                y={
                  data[selectedBarIndex].keyness >= 0
                    ? zeroYPosition -
                      data[selectedBarIndex].keyness * pixelsPerUnit -
                      40
                    : zeroYPosition - 40
                }
                width={POPUP_WIDTH}
                height={85}
              >
                <div className="barchart-popup-container">
                  <BarChartPopup data={data[selectedBarIndex]} colorScale={Object.values(colorScale)} />
                </div>
              </foreignObject>
            );
          })()}
      </g>
    </svg>
  );
}

export default BarChart;

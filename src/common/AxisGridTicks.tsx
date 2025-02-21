import React from "react"

// Types
import { AxisGridTicksProps } from "./types";
// CSS
import "./AxisGridTicks.css";

function AxisGridTicks({
  axis,
  ticks,
  axisLength,
  otherLength,
  startMargin,
  axisStartOffset = 0,
  axisEndOffset = 0,
  showLines = false,
  roundingMode = "none"
}: AxisGridTicksProps) {
  const roundToHalf = (value: number) => {
    const remainder = value % 1;
    return remainder < 0.25 ? Math.floor(value) :
           remainder >= 0.75 ? Math.ceil(value) :
           Math.floor(value) + 0.5;
  };

  const isVertical = axis === "y";
  const effectiveLength = isVertical ? axisLength : otherLength;
  
  // Calculate positions based on provided ticks
  const valueRange = ticks[ticks.length - 1] - ticks[0];

  return (
    <g className={`${axis}-grid-ticks`}>
      {ticks.map((value: number) => {
        const lengthPercentage = (value - ticks[0]) / valueRange;
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
          textOffsetY = 1;
          anchor = "end";
        }

        return (
          <g key={value}>
            {showLines && <line x1={x1} y1={y1} x2={x2} y2={y2} />}
            <text x={x1 + textOffsetX} y={y1 + textOffsetY} textAnchor={anchor}>
              {(roundingMode === "half" ? roundToHalf(value) :
                roundingMode === "integer" ? Math.round(value) :
                value).toFixed(1).replace(/(\.0)|0$/, "")}
            </text>
          </g>
        );
      })}
    </g>
  );
}

export default AxisGridTicks;
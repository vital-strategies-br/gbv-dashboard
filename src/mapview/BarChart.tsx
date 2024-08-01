import React from 'react';

import Bar from './Bar';
import { BarChartProps } from "./types";
import "./BarChart.css";

const MAX_VALUE = 1;
const BINS = 25;
const YLIM = [0, 30];

function linspace(start: number, end: number, num: number): number[] {
    const result = [];
    const step = (end - start) / (num - 1);
    for (let i = 0; i < num; i++) {
        result.push(start + (step * i));
    }
    return result;
}

function BarChart({ data, width = 500, height = 350 }: BarChartProps) {
    const values = Object.values(data).map(x => x.value);

    let nullCount = 0;
    const binSize = MAX_VALUE / BINS;
    const binCounts = new Array(BINS).fill(0);

    for (const value of values) {
        if (value === null) nullCount++;
        else binCounts[Math.min(Math.floor(value / binSize), BINS - 1)]++;
    }

    return (
        <svg width="100%" height={350} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMinYMin">
            {/* {binCounts.map((count, index) => (
                <Bar
                    key={index}
                    value={count}
                    maxDataValue={MAX_VALUE}
                    width={width}
                    plotHeight={height}
                    index={index}
                    totalBars={binCounts.length}
                    yAxisLimits={YLIM}
                />
            ))} */}
            {linspace(YLIM[0], YLIM[1], 5).map(value => (
                <g className="y-tick">

                    <line key={value} x1="70" y1={height - (value * (height / YLIM[1]))} x2={width} y2={height - (value * (height / YLIM[1]))} stroke="#B1B1B1" />
                    <text x="40" y={height - (value * (height / YLIM[1]))} fontSize={14}>{value}</text>
                </g>
            ))}

            {/* <line x1="0" y1={height - 20} x2={width} y2={height - 20} stroke="black" /> */}
            {/* <line x1="0" y1="0" x2="0" y2={height - 20} stroke="black" /> */}
            {/* {labels.map((label, index) => (
                <text
                    key={index}
                    x={index * barWidth + (barWidth - 10) / 2}
                    y={height - 5}
                    textAnchor="middle"
                    fontSize="10"
                    fill="black"
                >
                    {label}
                </text>
            ))} */}
            <text
                x={(width / 2) + 70}
                y={height}
                textAnchor="middle"
                fontSize="14"
            >
                Número estimado de casos subnotificados por 10 mil usuárias AB
            </text>
            <text
                x={-height / 2}
                y={14}
                textAnchor="middle"
                fontSize="14"
                transform="rotate(-90)"
            >
                Número de Bairros
            </text>
        </svg>
    );
};

export default BarChart;

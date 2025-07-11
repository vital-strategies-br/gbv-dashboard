export interface AgeGroupTemporalData {
    n: number,
    data: number[][];
    highlightDay: number;
}

export interface TemporalData {
    violence_type: string,
    age_groups: AgeGroupTemporalData[],
}

export interface LineChartProps {
    data: number[][];
    width?: number;
    height?: number;
    xAxisLimits?: [number, number];
    yAxisLimits?: [number, number];
    annotations?: {
        text: string,
        xPos?: number,
        yPos?: number,
    }[]
}
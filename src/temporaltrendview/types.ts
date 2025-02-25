export interface TemporalData {
    violence_type: string,
    age_group: number,
    n: number,
    data: number[][];
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
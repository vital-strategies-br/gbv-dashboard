export interface AxisGridTicksProps {
    axis: "x" | "y";
    ticks: number[];
    axisLength: number;
    otherLength: number;
    startMargin: number;
    axisStartOffset?: number;
    axisEndOffset?: number;
    showLines?: boolean;
    roundingMode?: "none" | "integer" | "half";
}

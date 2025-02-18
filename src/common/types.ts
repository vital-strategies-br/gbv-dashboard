export interface AxisGridTicksProps {
    axis: "x" | "y";
    limits: [number, number];
    numTicks?: number;
    axisLength: number;
    otherLength: number;
    startMargin: number;
    axisStartOffset?: number;
    axisEndOffset?: number;
    showLines?: boolean;
    roundSteps?: boolean;
    roundingMode?: "none" | "integer" | "half";
}

export interface KeynessData {
    // The type of SINAN notification used to obtain a corpus
    notification_type: string,
    // The UI name of frame
    frame: string,
    // The year of the analysis
    year: number,
    // The data for the bar chart
    data: KeynessDataPoint[];
}

export interface KeynessDataPoint {
    // Name of the lexical unit
    lu: string;
    // Keyness score
    keyness: number;
}

export interface BarChartProps {
    data: KeynessDataPoint[];
    width?: number;
    height?: number;
  }

export interface BarProps {
    x: number;
    y: number;
    width: number;
    height: number;
    fill?: string;
}
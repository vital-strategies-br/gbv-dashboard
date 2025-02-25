export interface KeynessData {
    // The type of SINAN notification used to obtain a corpus
    violence_type: string,
    // The UI name of frame
    frame: string,
    // The year of the analysis
    year: number,
    // The data for the bar chart
    data: KeynessDataPoint[];
    // The top count LUs for this data
    top_lus: string[];
}

export interface KeynessDataPoint {
    // Name of the lexical unit
    lu: string;
    // Keyness score
    keyness: number;
    age_groups: AgeGroupKeynessDataPoint[];
}

export interface AgeGroupKeynessDataPoint {
    n: number;
    keyness: number;
}

export interface BarChartProps {
    data: KeynessDataPoint[];
    ageGroupLabels: string[];
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

export interface BarChartPopupProps {
    data: {
        keyness: number;
        lu: string;
        age_groups: { n: number; keyness: number }[];
    };
    colorScale: string[];
}
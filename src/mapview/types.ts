export enum RelativeCategory {
    MINIMAL = "Relative minimal",
    LOW = "Deviant low",
    BELOW_AVERAGE = "Below average",
    AVERAGE = "City average",
    ABOVE_AVERAGE = "Above average",
    HIGH = "Deviant high",
    EXTREME = "Relative extreme",
}

export interface SubnotificationData {
    year: number,
    esus: number | null,
    sinan: number | null,
    subnotification_rate: number | null,
    subnotification_rate_zscore: number | null,
    category? : RelativeCategory | null;
}

export interface NeighborhoodData {
    // Simplified name of the neighborhood
    neighborhood: string,
    // The UI name of the neighborhood
    name: string,
    // Different IDs for the neighborhood
    id_shape: number,
    id_sinan: number,
    id_geojson: number,
    id_district: number,
    // The UI name of the district
    district_name: string,
    // Different data points for possible UI filters
    data: Array<SubnotificationData>;
}

export interface UISubnotificationData extends SubnotificationData {
    id_shape: number,
    name: string
}

export interface SVGMapProps {
    // A mapping of path 'id' to color
    data: { [index: string]: UISubnotificationData },
    // The 'id' of the selected path
    selectedShapeId: number | null,
    // The territory category to be highlighted
    highlightedCategory: RelativeCategory | null;
    // Callback for click on a region of the map
    // Invoked with the 'id' of the path as argument
    onPathClick: (id: number) => void;
    // Callback for hovering a region of the map.
    // Invoked with the 'id' of the path as argument
    onPathMouseEnter: (id: number) => void;
    // When mouse leaves the WHOLE MAP.
    onMapMouseLeave: () => void;
}

export interface TooltipProps {
    // The data to be displayed
    data: UISubnotificationData;
}

export interface HistogramChartProps {
    binCounts: number[];
    binCategories?: (RelativeCategory | null)[];
    nullCount: number;
    xAxisLimits: [number, number];
    yAxisLimits: [number, number];
    width?: number,
    height?: number,
    highlightedCategory: RelativeCategory | null;
    onBarMouseEnter: (category: RelativeCategory | null) => void;
    onBarMouseLeave: () => void;
}

export interface HistogramBarProps {
    x: number;
    y: number;
    width: number;
    scale: number;
    value: number;
    category?: RelativeCategory | null;
    isActive?: boolean;
    onMouseEnter?: (category: RelativeCategory | null) => void;
    onMouseLeave?: () => void;
}

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
}
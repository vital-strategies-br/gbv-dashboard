export type TerritoryId = number;

export enum RelativeCategory {
    MINIMAL = "Mínimo relativo",
    LOW = "Baixa",
    BELOW_AVERAGE = "Abaixo da média",
    AVERAGE = "Média da cidade",
    ABOVE_AVERAGE = "Acima da média",
    HIGH = "Alta",
    EXTREME = "Extremo relativo",
}

export interface SubnotificationData {
    year: number,
    esus: Nullable<number>,
    sinan: Nullable<number>,
    subnotification_rate: Nullable<number>,
    subnotification_rate_zscore: Nullable<number>,
    category?: Nullable<RelativeCategory>;
}

export interface TerritoryData {
    // Simplified name of the territory
    neighborhood: string,
    // The UI name of the territory
    name: string,
    // Different IDs for the territory
    id_shape: TerritoryId,
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
    selectedShapeId: Nullable<number>,
    // The territory category to be highlighted
    highlightedCategory?: Nullable<RelativeCategory>;
    // The territories to be highlighted
    highlightedTerritories?: Nullable<number>[];
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
    binCategories?: Nullable<RelativeCategory>[];
    nullCount: number;
    xAxisLimits: [number, number];
    yAxisLimits: [number, number];
    width?: number,
    height?: number,
    highlightedCategory?: Nullable<RelativeCategory>;
    highlightedBin?: Nullable<number>;
    onBarMouseEnter: (index: number | undefined) => void;
    onBarMouseLeave: () => void;
}

export interface HistogramBarProps {
    x: number;
    y: number;
    width: number;
    scale: number;
    value: number;
    index?: number;
    category?: Nullable<RelativeCategory>;
    isActive?: boolean;
    onMouseEnter?: (index: number | undefined) => void;
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

export interface TerritoryDetailProps {
    data: UISubnotificationData;
}

export interface HealthUnitData {
    name: string;
    suspectCases: number;
    esusUsers: number;
}
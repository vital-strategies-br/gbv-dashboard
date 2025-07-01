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

export interface HealthUnitData {
    unit_name: string;
    esus_users: number;
    sinan_notifications: number;
    suspected_cases: number;
}

export interface SubnotificationData {
    year: number,
    population: number,
    resident_esus_users: Nullable<number>,
    resident_sinan_notifications: Nullable<number>,
    resident_suspected_cases: Nullable<number>,
    subnotification_rate: Nullable<number>,
    subnotification_rate_zscore: Nullable<number>,
    units: HealthUnitData[];
    category?: Nullable<RelativeCategory>;
}

export interface TerritoryData {
    // Simplified name of the territory
    neighborhood: string,
    // The UI name of the territory
    name: string,
    // Shape ID
    id_shape: TerritoryId,
    // Different data points for possible UI filters
    periods: Array<SubnotificationData>;
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

export interface TerritoryDetailProps {
    data: UISubnotificationData;
}


interface SubnotificationData {
    year: number,
    esus: number | null,
    sinan: number | null,
    subnotification_rate: number | null,
    subnotification_rate_zscore: number | null,
    relative_subnotification_index: number | null,
    relative_subnotification_category: string | null
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
    name: string
}

export interface SVGMapProps {
    // A mapping of path 'id' to color
    data: { [index: string]: UISubnotificationData },
    // The 'id' of the selected path
    selectedShapeId: number | null,
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

export interface BarChartProps {
    data: { [index: number]: UISubnotificationData },
    width?: number,
    height?: number,
}
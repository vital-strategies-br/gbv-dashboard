type SubnotificationData = {
    year: number,
    esus: number | null,
    sinan: number | null,
    subnotification_rate: number | null,
    subnotification_rate_zscore: number | null,
    relative_subnotification_index: number | null,
    relative_subnotification_category: string | null
}

export type NeighborhoodData = {
    // Simplified name of the neighborhood
    neighborhood: string,
    // The UI name of the neighborhood
    name: string,
    id_shape: number,
    id_sinan: number,
    id_geojson: number,
    id_district: number,
    district_name: string,
    // Different data points for possible UI filters
    data: Array<SubnotificationData>;
}

export type PathData = {
    name: string,
    value: number | null,
}

export type SVGMapProps = {
    // A mapping of path 'id' to color
    data: { [index: number]: PathData },
    // The 'id' of the selected path
    selectedShape: number | null,
    // The onShapeClick callback
    onPathClick: (id: number) => void;
}

export type BarChartProps = {
    data: { [index: number]: PathData },
    width?: number,
    height?: number,
}
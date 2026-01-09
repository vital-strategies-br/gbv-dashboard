import { CategoryScheme, RelativeCategory, TerritoryData, SubnotificationData, UISubnotificationData } from "./types";

export const SEQUENTIAL_PALETTE = [
    // '#fff0f0',
    '#ffe1e2',
    '#ffc7c8',
    '#ffa0a2',
    '#ff5054',
    // '#f53d40',
    '#e61e21',
    '#b62023',
    '#931f21',
    // '#7e2021',
    // '#480708'
];

export const NA_COLOR = "#d4d4d4"

export const CATEGORY_ORDER: RelativeCategory[] = [
    RelativeCategory.MINIMAL,
    RelativeCategory.LOW,
    RelativeCategory.BELOW_AVERAGE,
    RelativeCategory.AVERAGE,
    RelativeCategory.ABOVE_AVERAGE,
    RelativeCategory.HIGH,
    RelativeCategory.EXTREME,
];


export function getCategoryScheme(): CategoryScheme {
    const allCategories = CATEGORY_ORDER;
    const innerCategories = allCategories.slice(1, -1);

    const range = 6; // -3 .. 3
    const step = range / innerCategories.length;

    const boundaries: number[] = [-3];
    for (let i = 1; i < innerCategories.length; i++) {
        boundaries.push(-3 + step * i);
    }
    boundaries.push(3);

    return {
        allCategories,
        innerCategories,
        boundaries,
        step,
    };
}

const CATEGORY_SCHEME = getCategoryScheme();


export function zScoreToCategory(zScore: Nullable<number>): Nullable<RelativeCategory> {
    if (zScore == null) return null;

    const { allCategories, innerCategories, step } = CATEGORY_SCHEME;

    if (zScore <= -3) return allCategories[0];
    if (zScore >= 3) return allCategories[allCategories.length - 1];

    const index = Math.floor((zScore + 3) / step);
    return innerCategories[Math.min(Math.max(index, 0), innerCategories.length - 1)];
}


export function applyFilter(data: TerritoryData[], filterFn: (obj: SubnotificationData) => boolean): UISubnotificationData[] {
    return data.map((neighborhood) => {
        const yearData = neighborhood.periods.find(filterFn);

        if (yearData === undefined) {
            throw new Error(`Neighborhood ${neighborhood.name} is missing data for filter ${filterFn}!`)
        }

        return {
            id_shape: neighborhood.id_shape,
            name: neighborhood.name,
            ...yearData
        } as UISubnotificationData;

    });
}

export function assignCategories(
    neighborhoods: TerritoryData[]
): TerritoryData[] {
    return neighborhoods.map((neighborhood) => ({
        ...neighborhood,
        periods: neighborhood.periods.map((data) => ({
            ...data,
            category: zScoreToCategory(data.subnotification_rate_zscore),
        })),
    }));
}

/**
 * Initializes category counts for each bin.
 * @param bins - Number of bins in the histogram.
 * @returns An object with category counts initialized to zero for each bin.
 */
function initializeCategoryCounts(bins: number): { [binIndex: number]: { [category: string]: number } } {
    const initialCounts = CATEGORY_ORDER.reduce((acc, category) => {
        acc[category] = 0;
        return acc;
    }, {} as { [category: string]: number });

    return Array.from({ length: bins }, () => ({ ...initialCounts }));
}

/**
 * Determines the majority category for a bin and logs a warning if categories are mixed.
 * @param counts - Category counts for the bin.
 * @param binIndex - Index of the bin.
 * @returns The majority category or null if no items.
 */
function getMajorityCategory(
    counts: { [category: string]: number },
    binIndex: number
): Nullable<RelativeCategory> {
    const sortedCategories = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    const total = sortedCategories.map(x => x[1]).reduce((a, b) => a + b);

    if (sortedCategories.length > 0) {
        const [majorityCategory, majorityCount] = sortedCategories[0];
        if (majorityCount / total < 1) {
            console.warn(`Bin ${binIndex} contains mixed categories.`);
        }
        return majorityCategory as RelativeCategory;
    }

    return null;
}

/**
 * Computes histogram data including bin counts, majority category per bin, null count, and items in each bin.
 * @param data - Array of UISubnotificationData objects to process.
 * @param extractorFn - Function to get the 'value' of each record to be used for histogram.
 * @param bins - Number of bins in the histogram.
 * @param limits - Tuple defining the range of values for the bins ([min, max]).
 * @returns An array containing arrays of bin counts, categories, null count, and data points for each bin.
 */
export function getHistogramData(
    data: UISubnotificationData[],
    extractorFn: (obj: UISubnotificationData) => Nullable<number>,
    bins: number,
    limits: [number, number]
): [UISubnotificationData[][], (Nullable<RelativeCategory>)[], number] {
    const binSize = (limits[1] - limits[0]) / bins;

    // Initialize category counts and data points for each bin
    const categoryCountsByBin: { [binIndex: number]: { [category: string]: number } } = initializeCategoryCounts(bins);
    const binData: UISubnotificationData[][] = Array.from({ length: bins }, () => []);

    let nullCount = 0;

    // Update counts and data points for each data entry
    data.forEach(obj => {
        let value = extractorFn(obj);

        if (value === null) {
            nullCount++;
            return;
        }

        const binIndex = value >= limits[1]
            ? bins - 1
            : value <= limits[0]
                ? 0
                : Math.floor((value - limits[0]) / binSize);

        binData[binIndex].push(obj);

        if (obj.category) {
            categoryCountsByBin[binIndex][obj.category]++;
        }
    });

    // Determine the majority category for each bin
    const binCategories = binData.map(x => x.length).map((_, i) => getMajorityCategory(categoryCountsByBin[i], i));

    return [binData, binCategories, nullCount];
}

/**
 * Returns the corresponding color from the SEQUENTIAL_PALETTE for a given RelativeCategory.
 * 
 * This function maps a RelativeCategory to an index in the SEQUENTIAL_PALETTE array.
 * If the category is null, not mapped, or the index is out of bounds, it returns a default color (NA_COLOR).
 * 
 * @param {Nullable<RelativeCategory>} category - The relative category to be mapped to a color.
 * @returns {string} The color associated with the given category. If the category is null, returns the default NA_COLOR.
 * 
 * @example
 * // Returns "#FF5054"
 * getColorForCategory(RelativeCategory.ABOVE_AVERAGE);
 * 
 * @example
 * // Returns the default NA_COLOR ("#d4d4d4")
 * getColorForCategory(null);
 */
export function getColorForCategory(category: Nullable<RelativeCategory>): string {
  if (category == null) return NA_COLOR;

  const idx = CATEGORY_ORDER.indexOf(category);
  if (idx === -1) return NA_COLOR;

  // If palette is longer than categories, keep as-is; if shorter, clamp.
  return SEQUENTIAL_PALETTE[Math.min(idx, SEQUENTIAL_PALETTE.length - 1)] ?? NA_COLOR;
}


export function formatPercentage(float: Nullable<number>, decimalPoints: number = 2) {
    if (float === null) return "n.d.";
    return (float * 100).toFixed(decimalPoints) + "%"
}

export function formatRatePer10k(float: Nullable<number>) {
    if (float === null) return "n.d.";
    return Math.round(float * 10 * 1000);
}
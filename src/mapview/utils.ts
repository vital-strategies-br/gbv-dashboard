import { RelativeCategory, TerritoryData, SubnotificationData, UISubnotificationData } from "./types";

// export const SEQUENTIAL_PALETTE = [
//     '#c7caff', // Lightest shade
//     '#a0a9ff',
//     '#7989ff',
//     '#4766ff', // Base color
//     '#3f5cd4',
//     '#374caa',
//     '#2f3d80'  // Darkest shade
// ];

export const SEQUENTIAL_PALETTE = [
    '#fbb6b7', // Lightest shade
    '#f99093',
    '#f76a6c',
    '#F53D40', // Base color
    '#dc3739',
    '#c33032',
    '#aa292a'  // Darkest shade
];

export const DIVERGENT_PALETTE = [
    '#2f3d80',  // Darkest shade
    '#4766ff', // Base color
    '#c7caff', // Lightest shade
    '#909090',
    '#fbb6b7', // Lightest shade
    '#F53D40', // Base color
    '#aa292a'  // Darkest shade
]

export const NA_COLOR = "#d4d4d4"

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

export function assignCategories(neighborhoods: TerritoryData[]): TerritoryData[] {
    // Get the categories dynamically, excluding the first and last
    const allCategories = Object.values(RelativeCategory);
    const categories = allCategories.slice(1, -1); // Exclude EXTREME categories

    // Helper function to get the category based on z-score
    const getCategory = (zScore: Nullable<number>): Nullable<RelativeCategory> => {
        if (zScore === null) return null;

        if (zScore <= -3) return allCategories[0];
        if (zScore >= 3) return allCategories[allCategories.length - 1];

        // Determine the appropriate category within the (-3, 3) range
        const range = 6; // From -3 to 3
        const numCategories = categories.length;
        const step = range / numCategories;
        const index = Math.floor((zScore + 3) / step);

        return categories[Math.min(Math.max(index, 0), numCategories - 1)];
    };

    // Create a new object with updated categories
    return neighborhoods.map(neighborhood => ({
        ...neighborhood,
        periods: neighborhood.periods.map(data => ({
            ...data,
            category: getCategory(data.subnotification_rate_zscore)
        }))
    }));
};

/**
 * Initializes category counts for each bin.
 * @param bins - Number of bins in the histogram.
 * @returns An object with category counts initialized to zero for each bin.
 */
function initializeCategoryCounts(bins: number): { [binIndex: number]: { [category: string]: number } } {
    const initialCounts = Object.values(RelativeCategory).reduce((acc, category) => {
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
    const total = sortedCategories.map(x => x[1]).reduce((a, b) => a+b);

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
    // Return NA_COLOR if category is null
    if (category === null || category === undefined) {
        return NA_COLOR;
    }

    // Define the mapping of RelativeCategory to palette indices
    const categoryToPaletteIndex: { [key in RelativeCategory]: number } = {
        [RelativeCategory.MINIMAL]: 0,
        [RelativeCategory.LOW]: 1,
        [RelativeCategory.BELOW_AVERAGE]: 2,
        [RelativeCategory.AVERAGE]: 3,
        [RelativeCategory.ABOVE_AVERAGE]: 4,
        [RelativeCategory.HIGH]: 5,
        [RelativeCategory.EXTREME]: 6,
    };

    return SEQUENTIAL_PALETTE[categoryToPaletteIndex[category]];
}

export function formatPercentage(float: Nullable<number>, decimalPoints: number = 2) {
    if (float === null) return "n.d.";
    return (float * 100).toFixed(decimalPoints) + "%"
}
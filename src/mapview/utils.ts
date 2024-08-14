import { RelativeCategory, NeighborhoodData, SubnotificationData, UISubnotificationData } from "./types";

export const SEQ_PALETTE = [
    "#FFF0F0",
    "#FFE1E2",
    // "#FFC7C8",
    "#FFA0A2",
    "#FF5054",
    // "#F53D40",
    "#E61E21",
    "#B62023",
    // "#931F21",
    "#7E2021",
    // "#480708",
];
export const NA_COLOR = "#d4d4d4"

export function applyFilter(data: NeighborhoodData[], filterFn: (obj: SubnotificationData) => boolean): UISubnotificationData[] {
    return data.map((neighborhood) => {
        const yearData = neighborhood.data.find(filterFn);

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

export function assignCategories(neighborhoods: NeighborhoodData[]): NeighborhoodData[] {
    // Get the categories dynamically, excluding the first and last
    const allCategories = Object.values(RelativeCategory);
    const categories = allCategories.slice(1, -1); // Exclude EXTREME categories

    // Helper function to get the category based on z-score
    const getCategory = (zScore: number | null): RelativeCategory | null => {
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
        data: neighborhood.data.map(data => ({
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
 * @param total - Total count of items in the bin.
 * @param binIndex - Index of the bin.
 * @returns The majority category or null if no items.
 */
function getMajorityCategory(
    counts: { [category: string]: number },
    total: number,
    binIndex: number
): RelativeCategory | null {
    const sortedCategories = Object.entries(counts).sort((a, b) => b[1] - a[1]);

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
 * Computes histogram data including bin counts, majority category per bin, and null count.
 * @param data - Array of UISubnotificationData objects to process.
 * @param bins - Number of bins in the histogram.
 * @param limits - Tuple defining the range of values for the bins ([min, max]).
 * @returns An array containing arrays of bin counts and categories, and null count.
 */
export function getHistogramData(
    data: UISubnotificationData[],
    bins: number,
    limits: [number, number]
): [number[], (RelativeCategory | null)[], number] {
    const binSize = (limits[1] - limits[0]) / bins;
    const binCounts = new Array(bins).fill(0);

    // Initialize category counts for each bin
    const categoryCountsByBin: { [binIndex: number]: { [category: string]: number } } = initializeCategoryCounts(bins);

    let nullCount = 0;

    // Update counts for each data entry
    data.forEach(obj => {
        let value = obj.subnotification_rate;

        if (value === null) {
            nullCount++;
            return;
        }

        const binIndex = value >= limits[1]
            ? bins - 1
            : value <= limits[0]
                ? 0
                : Math.floor((value - limits[0]) / binSize);

        binCounts[binIndex]++;
        if (obj.category) {
            categoryCountsByBin[binIndex][obj.category]++;
        }
    });

    // Determine the majority category for each bin
    const binCategories = binCounts.map((_, i) => getMajorityCategory(categoryCountsByBin[i], binCounts[i], i));

    return [binCounts, binCategories, nullCount];
}

/**
 * Returns the corresponding color from the SEQ_PALETTE for a given RelativeCategory.
 * 
 * This function maps a RelativeCategory to an index in the SEQ_PALETTE array.
 * If the category is null, not mapped, or the index is out of bounds, it returns a default color (NA_COLOR).
 * 
 * @param {RelativeCategory | null} category - The relative category to be mapped to a color.
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
export function getColorForCategory(category: RelativeCategory | null | undefined): string {
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

    return SEQ_PALETTE[categoryToPaletteIndex[category]];
}

/**
 * Generates an array of linearly spaced numbers between a start and end value.
 *
 * @param {number} startValue - The first value in the generated sequence.
 * @param {number} endValue - The last value in the generated sequence.
 * @param {number} numPoints - The number of values to generate in the sequence.
 * @param {boolean} [shouldRoundSteps=false] - If true, rounds the step size to the nearest integer.
 * @returns {number[]} An array of `numPoints` linearly spaced values between `startValue` and `endValue`.
 *
 * @example
 * // Generates 5 points between 0 and 10
 * generateLinearSpace(0, 10, 5);
 * // Returns [0, 2.5, 5, 7.5, 10]
 *
 * @example
 * // Generates 4 points between 0 and 8 with rounded step sizes
 * generateLinearSpace(0, 8, 4, true);
 * // Returns [0, 3, 6, 9]
 */

export function generateLinearSpace(
    startValue: number,
    endValue: number,
    numPoints: number,
    shouldRoundSteps: boolean = false
): number[] {
    const pointsArray = [];
    const range = endValue - startValue;
    let stepSize = range / (numPoints - 1);
    if (shouldRoundSteps) {
        stepSize = Math.round(stepSize);
    }
    for (let pointIndex = 0; pointIndex < numPoints; pointIndex++) {
        pointsArray.push(startValue + stepSize * pointIndex);
    }
    return pointsArray;
}
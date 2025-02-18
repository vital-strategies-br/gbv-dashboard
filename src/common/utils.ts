/**
 * Generates an array of linearly spaced numbers between a start and end value,
 * ensuring 0 is included if it falls within the range.
 *
 * @param {number} startValue - The first value in the generated sequence.
 * @param {number} endValue - The last value in the generated sequence.
 * @param {number} numPoints - The number of values to generate in the sequence.
 * @returns {number[]} An array of linearly spaced values including 0 if within range.
 * 
 * @example
 * // Round to nearest 0.5
 * generateLinearSpace(-2, 2, 5, 'half');
 * // Returns [-2, -1.5, 0, 1.5, 2]
 * 
 * @example
 * // Round to nearest integer
 * generateLinearSpace(-2, 2, 5, 'integer');
 * // Returns [-2, -1, 0, 1, 2]
 */
export function generateLinearSpace(
    startValue: number,
    endValue: number,
    numPoints: number
): number[] {
    // Return early if start and end are the same
    if (startValue === endValue) {
        return [startValue];
    }

    // Ensure start is less than end
    if (startValue > endValue) {
        [startValue, endValue] = [endValue, startValue];
    }

    const generatePoints = (start: number, end: number, count: number): number[] => {
        const points = [];
        const step = (end - start) / (count - 1);
        for (let i = 0; i < count; i++) {
            points.push(start + i * step);
        }
        return points;
    };

    let result: number[];
    
    // If 0 is within range but not exactly at start or end
    if (startValue < 0 && endValue > 0) {
        const negativePoints = Math.floor(numPoints * (Math.abs(startValue) / (Math.abs(startValue) + endValue)));
        const positivePoints = numPoints - negativePoints - 1; // -1 for zero

        result = [
            ...generatePoints(startValue, 0, negativePoints + 1).slice(0, -1),
            0,
            ...generatePoints(0, endValue, positivePoints + 1).slice(1)
        ];
    } else {
        result = generatePoints(startValue, endValue, numPoints);
    }

    return result;
}
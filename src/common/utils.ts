/**
 * Generates tick values with a consistent step size, ensuring 0 is included
 * and extending beyond data limits if needed for clean intervals.
 * 
 * @param {number} dataMin - Minimum value in the data
 * @param {number} dataMax - Maximum value in the data
 * @param {number} targetNumTicks - Approximate number of ticks desired (will be adjusted)
 * @param {number[]} possibleSteps - Possible step sizes to consider
 * @returns {{ 
 *   ticks: number[],
 *   min: number,
 *   max: number,
 *   step: number
 * }} Tick values and range information
 */
export function generateTickRange(
  dataMin: number,
  dataMax: number,
  targetNumTicks: number = 6,
  possibleSteps: number[] = [1, 2, 3, 5, 10, 20, 30, 50]
) {
  // Find the step size that gives us closest to targetNumTicks
  let bestStep = possibleSteps[0];
  let bestTickCount = Infinity;
  
  for (const step of possibleSteps) {
    const minTick = Math.floor(dataMin / step) * step;
    const maxTick = Math.ceil(dataMax / step) * step;
    const numTicks = Math.round((maxTick - minTick) / step) + 1;
    
    if (Math.abs(numTicks - targetNumTicks) < Math.abs(bestTickCount - targetNumTicks)) {
      bestStep = step;
      bestTickCount = numTicks;
    }
  }

  console.log(`Best step size: ${bestStep}, Tick count: ${bestTickCount}`);
  // Generate final ticks with best step size
  const minTick = Math.floor(dataMin / bestStep) * bestStep;
  const maxTick = Math.ceil(dataMax / bestStep) * bestStep;
  
  const ticks: number[] = [];
  for (let tick = minTick; tick <= maxTick; tick += bestStep) {
    ticks.push(tick);
  }
  if (!ticks.includes(0) && minTick < 0 && maxTick > 0) {
    ticks.push(0);
    ticks.sort((a, b) => a - b);
  }

  return {
    ticks,
    min: minTick,
    max: maxTick,
    step: bestStep
  };
}
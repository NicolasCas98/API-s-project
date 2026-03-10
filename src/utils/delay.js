/**
 * Delays execution for a given time.
 * 
 * @param {number} milliseconds
 * @returns {Promise<void>}
 */

export const delayExecution = (milliseconds = 500) => {
    console.log(`Delaying execution for ${milliseconds} ms`);
    return new Promise(resolve => setTimeout(resolve, milliseconds));
};
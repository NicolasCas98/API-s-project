import { delayExecution } from "./delay.js";

/**
 * Retry wrapper for HTTP requests
 * @param {Function} requestFn function that executes the request
 * @param {number} maxRetries
 * @returns {Promise<any>}
 */
export const retry = async (requestFn, maxRetries = 3) => {

  let attempt = 0;
  let delay = 1000;

  while (attempt < maxRetries) {

    try {

      return await requestFn();

    } catch (error) {

      const retryAfter = error?.response?.data?.retry_after;

      console.warn(`Request failed. Attempt ${attempt + 1}`);

      if (retryAfter) {

        const waitTime = retryAfter * 1000;

        console.warn(`Rate limited. Waiting ${waitTime} ms`);

        await delayExecution(waitTime);

      } else {

        console.warn(`Retrying in ${delay} ms`);

        await delayExecution(delay);

        delay *= 2;

      }

      attempt++;

      if (attempt >= maxRetries) {

        throw new Error(
          `Request failed after ${maxRetries} retries: ${error?.message || "Unknown error"}`
        );

      }

    }

  }

};
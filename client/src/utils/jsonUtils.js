/**
 * Centralized utility for robust JSON parsing.
 * Shields the application from SyntaxError when localStorage entries or API responses
 * are empty strings, whitespace, 'undefined', or malformed JSON.
 *
 * @param {string|any} str - The value to parse
 * @param {any} fallback - Default value to return on parse failure or empty input
 * @returns {any}
 */
export const safeJsonParse = (str, fallback = null) => {
  if (str === null || str === undefined) return fallback;
  if (typeof str !== 'string') {
    if (typeof str === 'object') return str;
    return fallback;
  }
  const trimmed = str.trim();
  if (!trimmed || trimmed === 'undefined' || trimmed === 'null') {
    return fallback;
  }
  try {
    return JSON.parse(trimmed);
  } catch (err) {
    return fallback;
  }
};

export default safeJsonParse;


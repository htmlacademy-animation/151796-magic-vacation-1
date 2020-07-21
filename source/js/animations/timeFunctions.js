export const makeEaseOut = (timing) => {
  return (timeFraction) => {
    return 1 - timing(1 - timeFraction);
  };
};

/**
 * @param {number} x force - lower value gives stronger effect
 * @return {function(): number}
 */
export const elasticIn = (x) => (timeFraction) => {
  return Math.pow(Math.max(x * timeFraction, 2), 10 * (timeFraction - 1)) * Math.cos(10 * Math.PI * timeFraction);
};

/**
 * @param {number} x force - lower value gives stronger effect
 * @return {function(): number}
 */
export const elasticOut = (x) => makeEaseOut(elasticIn(x));

/**
 * @param {number} timeFraction
 * @return {number}
 */
export const linear = (timeFraction) => timeFraction;

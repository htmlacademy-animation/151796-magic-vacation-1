export const makeEaseOut = (timing) => {
  return (timeFraction) => {
    return 1 - timing(1 - timeFraction);
  };
};

export const bounceIn = (timeFraction) => {
  for (let a = 0, b = 1; ; a += b, b /= 2) {
    if (timeFraction >= (7 - 4 * a) / 11) {
      return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2);
    }
  }
};

export const bounceOut = makeEaseOut(bounceIn);

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
export const circ = (timeFraction) => 1 - Math.sin(Math.acos(timeFraction));

/**
 * @param {number} x
 * @param {number} timeFraction
 * @return {number}
 */
export const back = (x, timeFraction) => {
  return Math.pow(timeFraction, 2) * ((x + 1) * timeFraction - x);
};

/**
 * @param {number} timeFraction
 * @return {number}
 */
export const linear = (timeFraction) => timeFraction;

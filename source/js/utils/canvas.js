/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} x
 * @param {number} y
 */
export const skew = (ctx, x = 0, y = 0) => {
  ctx.transform(1, x, y, 1, 0, 0);
};

import {linear} from './timeFunctions';

/**
 * @param {number} from
 * @param {number} to
 * @param {number} progress
 * @return {*}
 */
export const defaultAnimationTick = (from, to, progress) => from + progress * Math.sign(to - from) * Math.abs(to - from);

/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} x
 * @param {number} y
 */
export const skew = (ctx, x = 0, y = 0) => {
  ctx.transform(1, x, y, 1, 0, 0);
};

/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} angle
 * @param {number} x
 * @param {number} y
 */
export const rotate = (ctx, angle, x, y) => {
  ctx.translate(x, y);
  ctx.rotate((Math.PI / 180) * angle);
  ctx.translate(-x, -y);
};

/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} cx
 * @param {number} cy
 * @param {number} horRadius
 * @param {number} verRadius
 */
export const drawEllipse = ({ctx, cx, cy, horRadius, verRadius}) => {
  ctx.beginPath();
  ctx.translate(cx, cy);

  /*
   * Масштабируем по х.
   * Теперь нарисованная окружность вытянется в a / b раз
   * и станет эллипсом
   */
  ctx.scale(horRadius / verRadius, 1);

  // Рисуем окружность, которая благодаря масштабированию станет эллипсом
  ctx.arc(0, 0, verRadius, 0, Math.PI * 2, true);

  ctx.closePath();
};

/**
 * @param {function} render
 * @param {number} duration
 * @param {function} easing
 * @return {Promise}
 */
export const animateEasing = (render, duration, easing) => new Promise((resolve) => {
  let start = Date.now();
  (function loop() {
    let p = (Date.now() - start) / duration;
    if (p > 1) {
      render(1);
      resolve();
    } else {
      requestAnimationFrame(loop);
      render(easing(p));
    }
  }());
});

/**
 * @param {function} render
 * @param {number} duration
 * @return {Promise}
 */
export const animateDuration = (render, duration) => animateEasing(render, duration, linear);

/**
 * @param {function[]} animations
 * @return {Promise<void>}
 */
export const runSerialAnimations = async (animations) => {
  for (const animation of animations) {
    await animation();
  }
};

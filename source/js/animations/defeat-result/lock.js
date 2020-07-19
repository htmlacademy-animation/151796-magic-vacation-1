import {animateDuration, defaultAnimationTick, scale} from '../helpers';

const LOCK_ANIMATION_DURATION = 100;

const ww = window.innerWidth;
const wh = window.innerHeight;

let lockOpacity = 1;
const lockSize = {
  width: 172,
  height: 292,
};
const lockPosition = {
  x: ww / 2 - lockSize.width / 2,
  y: wh / 2 - lockSize.height / 2,
};
let lockScale = 1;

const lockScaleAnimationTick = (from, to) => (progress) => {
  lockScale = defaultAnimationTick(from, to, progress);
};

const lockOpacityAnimationTick = (from, to) => (progress) => {
  lockOpacity = defaultAnimationTick(from, to, progress);
};

/**
 * @param {CanvasRenderingContext2D} ctx
 * @return {{draw: function, animate: function}}
 */
const lock = (ctx) => {
  const draw = () => {
    ctx.save();

    scale(ctx, lockScale, lockScale);

    ctx.beginPath();
    const bottom = lockPosition.y + lockSize.height;
    const right = lockPosition.x + lockSize.width;
    const middleTop = {
      x: lockPosition.x + lockSize.width / 2,
      y: lockPosition.y,
    };
    const rightMiddleBend = {
      x: right - 30,
      y: bottom - 146,
    };
    const leftMiddleBend = {
      x: lockPosition.x + 30,
      y: bottom - 146,
    };
    ctx.moveTo(lockPosition.x, bottom);
    ctx.lineTo(right, bottom);
    ctx.lineTo(rightMiddleBend.x, rightMiddleBend.y);
    const cp1 = {
      x: rightMiddleBend.x + 40,
      y: rightMiddleBend.y - 26,
    };
    const cp2 = {
      x: middleTop.x + 100,
      y: middleTop.y + 5,
    };
    const cp3 = {
      x: middleTop.x - 100,
      y: middleTop.y + 5,
    };
    const cp4 = {
      x: leftMiddleBend.x - 40,
      y: leftMiddleBend.y - 26,
    };
    ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, middleTop.x, middleTop.y);
    ctx.bezierCurveTo(cp3.x, cp3.y, cp4.x, cp4.y, leftMiddleBend.x, leftMiddleBend.y);

    ctx.globalAlpha = lockOpacity;
    ctx.fillStyle = `rgb(167, 126, 229)`;
    ctx.fill();

    ctx.restore();
  };

  const animate = () => {
    animateDuration(lockScaleAnimationTick(1, 1.2), LOCK_ANIMATION_DURATION);
    animateDuration(lockOpacityAnimationTick(0, 1), LOCK_ANIMATION_DURATION);
  };

  return {
    animate,
    draw,
  };
};

export default lock;

import {animateDuration, defaultAnimationTick, scale} from '../helpers';

const LOCK_ANIMATION_DURATION = 100;

const CROCODILE_ANIMATION_DURATION = 800;
const CROCODILE_ANIMATION_DELAY = 300;

const ww = window.innerWidth;
const wh = window.innerHeight;
const halfWW = ww / 2;
const halfWH = wh / 2;

// Lock

let lockOpacity = 1;
const lockSize = {
  width: 172,
  height: 292,
};
const lockPosition = {
  x: halfWW - lockSize.width / 2,
  y: halfWH - lockSize.height / 2,
};
let lockScale = 0.8;

const lockScaleAnimationTick = (from, to) => (progress) => {
  lockScale = defaultAnimationTick(from, to, progress);
};

const lockOpacityAnimationTick = (from, to) => (progress) => {
  lockOpacity = defaultAnimationTick(from, to, progress);
};

const getLockCoords = () => {
  const top = lockPosition.y;
  const left = lockPosition.x;
  const bottom = lockPosition.y + lockSize.height;
  const right = lockPosition.x + lockSize.width;

  const rightMiddleBend = {
    x: right - 30,
    y: bottom - 146,
  };
  const leftMiddleBend = {
    x: left + 30,
    y: bottom - 146,
  };

  const middleTop = {
    x: left + lockSize.width / 2,
    y: top,
  };

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

  return {
    top,
    left,
    bottom,
    right,
    rightMiddleBend,
    leftMiddleBend,
    middleTop,
    cp1,
    cp2,
    cp3,
    cp4,
  };
};

// Crocodile

let showCrocodile = false;
const crocodileSize = {
  width: 585,
  height: 180,
};
const crocodilePosition = {
  x: 0,
  y: 0,
};

/**
 * @param {{x: number, y: number}} from
 * @param {{x: number, y: number}} to
 * @return {function(...[*]=)}
 */
const crocodileTranslateAnimationTick = (from, to) => (progress) => {
  crocodilePosition.x = defaultAnimationTick(from.x, to.x, progress);
  crocodilePosition.y = defaultAnimationTick(from.y, to.y, progress);
};

/**
 * @param {CanvasRenderingContext2D} ctx
 * @return {Promise<{draw: function, animate: function}>}
 */
const lock = (ctx) => new Promise((resolve, reject) => {
  const crocodileImage = new Image();

  const drawCrocodile = () => {
    if (!showCrocodile) {
      return;
    }
    ctx.drawImage(crocodileImage, crocodilePosition.x, crocodilePosition.y, crocodileSize.width, crocodileSize.height);
  };

  const drawClippedLockPart = () => {
    const {bottom, right, rightMiddleBend, cp1, cp2, middleTop, top} = getLockCoords();

    ctx.save();

    ctx.beginPath();
    ctx.moveTo(right, bottom);
    ctx.lineTo(rightMiddleBend.x, rightMiddleBend.y);
    ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, middleTop.x, middleTop.y);
    ctx.lineTo(0, top);
    ctx.lineTo(0, wh);
    ctx.lineTo(right, wh);
    ctx.closePath();

    ctx.clip();
    drawCrocodile();

    ctx.restore();
  };

  const drawLock = () => {
    ctx.save();

    scale(ctx, lockScale, lockScale);

    ctx.beginPath();
    const {bottom, right, left, rightMiddleBend, leftMiddleBend, cp1, cp2, cp3, cp4, middleTop} = getLockCoords();
    ctx.moveTo(left, bottom);
    ctx.lineTo(right, bottom);
    ctx.lineTo(rightMiddleBend.x, rightMiddleBend.y);
    ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, middleTop.x, middleTop.y);
    ctx.bezierCurveTo(cp3.x, cp3.y, cp4.x, cp4.y, leftMiddleBend.x, leftMiddleBend.y);

    ctx.globalAlpha = lockOpacity;
    ctx.fillStyle = `rgb(167, 126, 229)`;
    ctx.fill();

    ctx.restore();
  };

  const draw = () => {
    drawLock();
    drawClippedLockPart();
  };

  const animateLock = () => {
    animateDuration(lockScaleAnimationTick(0.8, 1), LOCK_ANIMATION_DURATION);
    animateDuration(lockOpacityAnimationTick(0, 1), LOCK_ANIMATION_DURATION);
  };

  const animtateCrocodile = () => {
    setTimeout(() => {
      showCrocodile = true;
      animateDuration(crocodileTranslateAnimationTick({
        x: halfWW + 100,
        y: halfWH - 200,
      }, {
        x: halfWW - 280,
        y: halfWH - 10,
      }), CROCODILE_ANIMATION_DURATION);
    }, CROCODILE_ANIMATION_DELAY);
  };

  const animate = () => {
    animateLock();
    animtateCrocodile();
  };

  crocodileImage.onload = () => {
    resolve({
      animate,
      draw,
    });
  };

  crocodileImage.onerror = reject;

  crocodileImage.src = `img/lose-images/crocodile.png`;
});

export default lock;

import {animateDuration, defaultAnimationTick, runSerialAnimations, rotate} from '../helpers';

const ANIMATION_DURATION = 500;
const DELAY = 300;
const TRAIL_COLOR = `rgb(172, 195, 255)`;

const width = 80;
const height = 77;

const planeStart = {
  x: (window.innerWidth / 2) - 50,
  y: (window.innerHeight / 2) - 240,
};

const planeFinish = {
  x: (window.innerWidth / 2) + 354,
  y: (window.innerHeight / 2) - 133,
};

const initialAngle = 90;

let opacity = 0;
let translateY = 0;
let translateX = 0;
let angle = 0;
let ellipseHeight = 0;
let renderPlane = false;
let animationProgress = 0;

const getPlaneTail = () => ({
  x: translateX + width * 0.14,
  y: translateY + height * 0.865,
});

/**
 * @param {{ x: number, y: number }} from
 * @param {{ x: number, y: number }} to
 * @return {function(...[*]=)}
 */
const translateAnimationTick = (from, to) => (progress) => {
  translateX = defaultAnimationTick(from.x, to.x, progress);
  translateY =
    from.y -
    (
      Math.sign(to.y - from.y) *
      Math.abs(to.y - from.y) *
      Math.sin((progress * Math.PI) - (5 / 4 * Math.PI))
    );
};

const rotateAnimationTick = (from, to) => (progress) => {
  angle = defaultAnimationTick(from, to, progress);
};

const opacityAnimationTick = (from, to) => (progress) => {
  opacity = defaultAnimationTick(from, to, progress);
};

const animationTick = (progress) => {
  animationProgress = progress;
};

const getNormalizedTrailBezierOffset = (val) => val * animationProgress;

/**
 * @param {number} from
 * @param {number} to
 * @return {function(...[*]=)}
 */
const ellipseAnimationTick = (from, to) => (progress) => {
  ellipseHeight = defaultAnimationTick(from, to, progress);
};

const rotateAnimations = [
  () => animateDuration(rotateAnimationTick(initialAngle, initialAngle), ANIMATION_DURATION * 0.35),
  () => animateDuration(rotateAnimationTick(initialAngle, -10), ANIMATION_DURATION - (ANIMATION_DURATION * 0.35)),
];

/**
 * @param {CanvasRenderingContext2D} ctx
 * @return {Promise<{draw: function, animate: function}>}
 */
const airplane = (ctx) => new Promise((resolve, reject) => {
  const img = new Image();

  const drawPlane = () => {
    ctx.save();
    const planeTail = getPlaneTail();
    rotate(ctx, angle, planeTail.x, planeTail.y);
    ctx.globalAlpha = opacity;
    ctx.translate(translateX, translateY);
    ctx.drawImage(img, 0, 0, width, height);
    ctx.restore();
  };

  const drawTrail = () => {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(planeStart.x, planeStart.y);
    const planeTail = getPlaneTail();
    const cp1 = {
      x: planeStart.x + getNormalizedTrailBezierOffset(145),
      y: planeStart.y + getNormalizedTrailBezierOffset(10),
    };
    const cp2 = {
      x: planeTail.x - getNormalizedTrailBezierOffset(143),
      y: planeTail.y + getNormalizedTrailBezierOffset(59),
    };
    const cp3 = {
      x: planeTail.x - getNormalizedTrailBezierOffset(42),
      y: planeTail.y + getNormalizedTrailBezierOffset(71),
    };
    const cp4 = {
      x: planeStart.x + getNormalizedTrailBezierOffset(240),
      y: planeStart.y + getNormalizedTrailBezierOffset(325),
    };
    const cp5 = {
      x: planeStart.x - getNormalizedTrailBezierOffset(280),
      y: planeStart.y + ellipseHeight,
    };
    const cp6 = {
      x: planeStart.x - getNormalizedTrailBezierOffset(280),
      y: planeStart.y,
    };
    ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, planeTail.x, planeTail.y);
    ctx.bezierCurveTo(cp3.x, cp3.y, cp4.x, cp4.y, planeStart.x, planeStart.y + ellipseHeight);
    ctx.bezierCurveTo(cp5.x, cp5.y, cp6.x, cp6.y, planeStart.x, planeStart.y);
    ctx.fillStyle = TRAIL_COLOR;
    ctx.globalAlpha = opacity;
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  };

  const draw = () => {
    if (!renderPlane) {
      return;
    }

    drawPlane();
    drawTrail();
  };

  const animateTrail = () => {
    animateDuration(ellipseAnimationTick(0, 340), ANIMATION_DURATION);
  };

  const animatePlane = () => {
    animateDuration(translateAnimationTick(planeStart, planeFinish), ANIMATION_DURATION);
    runSerialAnimations(rotateAnimations);
  };

  const animate = () => {
    setTimeout(() => {
      if (!renderPlane) {
        renderPlane = true;
      }
      animatePlane();
      animateTrail();
      animateDuration(animationTick, ANIMATION_DURATION);
      animateDuration(opacityAnimationTick(0, 1), ANIMATION_DURATION * 0.3);
    }, DELAY);
  };

  img.onload = () => resolve({
    animate,
    draw,
  });

  img.onerror = reject;

  img.src = `/img/win-primary-images/airplane.png`;
});

export default airplane;

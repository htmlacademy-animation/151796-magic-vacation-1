import {animateDuration, defaultAnimationTick, runSerialAnimations, rotate, drawEllipse} from '../helpers';

const ANIMATION_DURATION = 700;
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
let ellipseCX = 0;
let ellipseCY = 0;
let ellipseHorR = 0;
let ellipseVerR = 0;
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
 * @param {{ cx: number, cy: number, verRadius: number, horRadius: number }} from
 * @param {{ cx: number, cy: number, verRadius: number, horRadius: number }} to
 * @return {function(...[*]=)}
 */
const ellipseAnimationTick = (from, to) => (progress) => {
  ellipseCX = defaultAnimationTick(from.cx, to.cx, progress);
  ellipseCY = defaultAnimationTick(from.cy, to.cy, progress);
  ellipseVerR = defaultAnimationTick(from.verRadius, to.verRadius, progress);
  ellipseHorR = defaultAnimationTick(from.horRadius, to.horRadius, progress);
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

  const drawTrailEllipse = () => {
    ctx.save();
    ctx.fillStyle = TRAIL_COLOR;
    ctx.globalAlpha = opacity;
    drawEllipse({ctx, cx: ellipseCX, cy: ellipseCY, horRadius: ellipseHorR, verRadius: ellipseVerR});
    ctx.fill();
    ctx.restore();
  };

  const drawTrail = () => {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(planeStart.x, planeStart.y);
    const planeTail = getPlaneTail();
    const cp1 = {
      x: planeStart.x + getNormalizedTrailBezierOffset(145),
      y: planeStart.y + getNormalizedTrailBezierOffset(27),
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
      x: planeStart.x + getNormalizedTrailBezierOffset(180),
      y: ellipseCY + ellipseVerR,
    };
    const cp6 = {
      x: planeStart.x + getNormalizedTrailBezierOffset(180),
      y: planeStart.y,
    };
    ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, planeTail.x, planeTail.y);
    ctx.bezierCurveTo(cp3.x, cp3.y, cp4.x, cp4.y, planeStart.x, ellipseCY + ellipseVerR);
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
    drawTrailEllipse();
    drawTrail();
  };

  const animateTrail = () => {
    animateDuration(ellipseAnimationTick({
      cx: planeStart.x,
      cy: planeStart.y,
      verRadius: 0,
      horRadius: 0,
    }, {
      cx: planeStart.x,
      cy: planeStart.y + 150,
      verRadius: 150,
      horRadius: 150,
    }), ANIMATION_DURATION);
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

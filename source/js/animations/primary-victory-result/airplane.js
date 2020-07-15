import {animateDuration, defaultAnimationTick, runSerialAnimations, rotate} from '../helpers';

const ANIMATION_DURATION = 500;
const DELAY = 300;

const TRAIL_COLOR = `rgb(172, 195, 255)`;
const TREE_COLOR = `rgb(92, 66, 137)`;

const windowHW = window.innerWidth / 2;
const windowHH = window.innerHeight / 2;

const planeWidth = 80;
const planeHeight = 77;

const planeStart = {
  x: windowHW - 50,
  y: windowHH - 240,
};

const planeFinish = {
  x: windowHW + 354,
  y: windowHH - 133,
};

const staticTreeTopPoint = {
  x: windowHW + 100,
  y: windowHH - 100,
};

const dynamicTreeTopPoint = {
  x: windowHW + 50,
  y: 0,
};

const initialAngle = 90;

let planeOpacity = 0;
let translateY = 0;
let translateX = 0;
let angle = 0;
let ellipseHeight = 0;
let renderPlane = false;
let animationProgress = 0;
let treeOpacity = 0;

const getPlaneTail = () => ({
  x: translateX + planeWidth * 0.14,
  y: translateY + planeHeight * 0.865,
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
  planeOpacity = defaultAnimationTick(from, to, progress);
};

const animationTick = (progress) => {
  animationProgress = progress;
};

const treeTranslateYAnimationTick = (from, to) => (progress) => {
  dynamicTreeTopPoint.y = defaultAnimationTick(from, to, progress);
};

const treeOpacityAnimationTick = (from, to) => (progress) => {
  treeOpacity = defaultAnimationTick(from, to, progress);
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
    ctx.globalAlpha = planeOpacity;
    ctx.translate(translateX, translateY);
    ctx.drawImage(img, 0, 0, planeWidth, planeHeight);
    ctx.restore();
  };

  const drawStaticTree = () => {
    ctx.beginPath();
    ctx.moveTo(staticTreeTopPoint.x, staticTreeTopPoint.y);
    ctx.lineTo(staticTreeTopPoint.x + 40, staticTreeTopPoint.y + 200);
    ctx.lineTo(staticTreeTopPoint.x - 40, staticTreeTopPoint.y + 200);
    ctx.fill();
    ctx.closePath();
  };

  const drawDynamicTree = () => {
    ctx.beginPath();
    ctx.moveTo(dynamicTreeTopPoint.x, dynamicTreeTopPoint.y);
    ctx.lineTo(dynamicTreeTopPoint.x + 50, dynamicTreeTopPoint.y + 300);
    ctx.lineTo(dynamicTreeTopPoint.x - 50, dynamicTreeTopPoint.y + 300);
    ctx.globalAlpha = treeOpacity;
    ctx.fill();
    ctx.closePath();
  };

  const drawTrees = () => {
    ctx.fillStyle = TREE_COLOR;
    drawStaticTree();
    drawDynamicTree();
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
    ctx.globalAlpha = planeOpacity;
    ctx.fill();
    ctx.closePath();
    ctx.clip();
    drawTrees();
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

  const animateTree = () => {
    animateDuration(treeTranslateYAnimationTick(windowHH - 50, windowHH - 190), 300);
    animateDuration(treeOpacityAnimationTick(0.5, 1), 300);
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

      setTimeout(() => {
        animateTree();
      }, ANIMATION_DURATION * 0.6);
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

import {animateEasing, runSerialAnimations, rotate, animateDuration, defaultAnimationTick} from '../helpers';
import {elasticOut} from '../timeFunctions';

const ANIMATION_DURATION = 6 * 1000;

const width = 408;
const height = 273;
const top = (window.innerHeight - height) / 2;
const left = (window.innerWidth - width) / 2;

let translateY = 0;
const translateX = left + (width / 2) - 30;
let angle = 0;

const getWalrusCY = () => {
  return translateY + (height / 2) + 50;
};

const translateAnimationTick = (from, to) => (progress) => {
  translateY = defaultAnimationTick(from, to, progress);
};

const rotateAnimationTick = (from, to) => (progress) => {
  angle = defaultAnimationTick(from, to, progress);
};

const rotateAnimations = [
  () => animateDuration(rotateAnimationTick(30, 30), 200),
  () => animateEasing(rotateAnimationTick(30, 0), ANIMATION_DURATION - 200, elasticOut(3)),
];

/**
 * @param {CanvasRenderingContext2D} ctx
 * @return {Promise<{draw: function, animate: function}>}
 */
const walrus = (ctx) => new Promise((resolve, reject) => {
  const img = new Image();

  const draw = () => {
    ctx.save();
    rotate(ctx, angle, translateX, getWalrusCY());
    ctx.translate(left, translateY);
    ctx.drawImage(img, 0, 0, width, height);
    ctx.restore();
  };

  const animate = () => {
    animateEasing(translateAnimationTick(window.innerHeight, top), ANIMATION_DURATION, elasticOut(5));
    runSerialAnimations(rotateAnimations);
    animateDuration(draw, ANIMATION_DURATION);
  };

  img.onload = () => resolve({
    animate,
    draw,
  });

  img.onerror = reject;

  img.src = `/img/win-primary-images/walrus.png`;
});

export default walrus;

import {animateEasing, runSerialAnimations, rotate, animateDuration, defaultAnimationTick} from '../helpers';
import {linear, elasticOut} from '../timeFunctions';

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
  () => animateEasing(rotateAnimationTick(30, 30), 200, linear),
  () => animateEasing(rotateAnimationTick(30, 0), 5800, elasticOut(3)),
];

/**
 * @param {CanvasRenderingContext2D} ctx
 */
const walrus = (ctx) => {
  const img = new Image();

  const draw = () => {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.save();
    rotate(ctx, angle, translateX, getWalrusCY());
    ctx.translate(left, translateY);
    ctx.drawImage(img, 0, 0, width, height);
    ctx.restore();
  };

  const animate = () => {
    animateEasing(translateAnimationTick(window.innerHeight, top), 6000, elasticOut(5));
    runSerialAnimations(rotateAnimations);
    animateDuration(draw, 10000);
  };

  img.onload = () => {
    animate();
  };

  img.src = `/img/win-primary-images/walrus.png`;
};

export default walrus;

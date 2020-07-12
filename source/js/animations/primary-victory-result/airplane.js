import {animateDuration, defaultAnimationTick, runSerialAnimations, rotate} from '../helpers';

const ANIMATION_DURATION = 700;
const DELAY = 300;

const width = 120;
const height = 116;

let translateY = 0;
let translateX = 0;
let angle = 0;
let opacity = 0;

const getPlaneCenter = () => ({
  x: translateX + (width / 2),
  y: translateY + (height / 2),
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
      Math.sin((progress * 5 / 4 * Math.PI) - (5 / 4 * Math.PI))
    );
};

const rotateAnimationTick = (from, to) => (progress) => {
  angle = defaultAnimationTick(from, to, progress);
};

const opacityAnimationTick = (from, to) => (progress) => {
  opacity = defaultAnimationTick(from, to, progress);
};

const rotateAnimations = [
  () => animateDuration(rotateAnimationTick(90, 90), ANIMATION_DURATION * 0.35),
  () => animateDuration(rotateAnimationTick(90, 0), ANIMATION_DURATION - (ANIMATION_DURATION * 0.35)),
];

/**
 * @param {CanvasRenderingContext2D} ctx
 * @return {Promise<{draw: function, animate: function}>}
 */
const airplane = (ctx) => new Promise((resolve, reject) => {
  const img = new Image();

  const draw = () => {
    ctx.save();
    const planeCenter = getPlaneCenter();
    rotate(ctx, angle, planeCenter.x, planeCenter.y);
    ctx.globalAlpha = opacity;
    ctx.translate(translateX, translateY);
    ctx.drawImage(img, 0, 0, width, height);
    ctx.restore();
  };

  const animate = () => {
    setTimeout(() => {
      animateDuration(translateAnimationTick({
        x: (window.innerWidth / 2) - 50,
        y: (window.innerHeight / 2) - 200,
      }, {
        x: (window.innerWidth / 2) + 300,
        y: (window.innerHeight / 2) - 150,
      },
      ), ANIMATION_DURATION);
      animateDuration(opacityAnimationTick(0, 1), ANIMATION_DURATION * 0.3);
      runSerialAnimations(rotateAnimations);
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

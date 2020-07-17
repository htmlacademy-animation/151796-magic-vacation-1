import {animateDuration, defaultAnimationTick, skew} from '../helpers';

const FULL_ANIMATION_DURATION = 8 * 1000;

const windowHW = window.innerWidth / 2;
const windowHH = window.innerHeight / 2;

const snow1 = {
  width: 232,
  height: 228,
  left: windowHW - 470,
  top: windowHH - (windowHH * 0.1),
  defaultTop: windowHH - (windowHH * 0.1),
  skewX: -0.2,
  skewY: 0.2,
  opacity: 0,
  opacityDelay: 600,
  movingDelay: 1400,
};

const snow2 = {
  width: 168,
  height: 160,
  left: -windowHW - 400,
  top: windowHH - (windowHH * 0.4),
  defaultTop: windowHH - (windowHH * 0.4),
  scaleX: -1,
  skewX: -0.2,
  skewY: 0.2,
  opacity: 0,
  opacityDelay: 1000,
  movingDelay: 0,
};

const translateAnimationTick = (params) => (from, to) => (progress) => {
  params.top =
    from -
    (
      Math.sign(to - from) *
      Math.abs(to - from) *
      Math.sin(progress * 6 * Math.PI)
    );
};

const opacityAnimationTick = (params) => (from, to) => (progress) => {
  params.opacity = defaultAnimationTick(from, to, progress);
};

/**
 * @param {CanvasRenderingContext2D} ctx
 * @return {Promise<{draw: function, animate: function}>}
 */
const snowflakes = (ctx) => new Promise((resolve, reject) => {
  const img = new Image();

  const drawSnowflake = ({
    scaleX = 1,
    scaleY = 1,
    skewX,
    skewY,
    top,
    left,
    width,
    height,
    opacity,
  }) => {
    ctx.save();
    ctx.scale(scaleX, scaleY);
    skew(ctx, skewX, skewY);
    ctx.globalAlpha = opacity;
    ctx.drawImage(img, left, top, width, height);
    ctx.restore();
  };

  const draw = () => {
    drawSnowflake(snow1);
    drawSnowflake(snow2);
  };

  const animateSnow = (params) => {
    setTimeout(() => {
      animateDuration(
          translateAnimationTick(params)(params.defaultTop, params.defaultTop - 10),
          FULL_ANIMATION_DURATION - params.movingDelay,
      );
    }, params.movingDelay);

    setTimeout(() => {
      animateDuration(opacityAnimationTick(params)(0, 1), 1000);
    }, params.opacityDelay);
  };

  const animate = () => {
    animateSnow(snow1);
    animateSnow(snow2);
  };

  img.onload = () => resolve({
    animate,
    draw,
  });

  img.onerror = reject;

  img.src = `img/win-primary-images/snowflake.png`;
});

export default snowflakes;

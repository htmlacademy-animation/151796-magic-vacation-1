import {skew} from '../../utils/canvas';

const params = [
  {
    width: 166,
    height: 190,
    left: (window.innerWidth / 2) - 450,
    top: (window.innerHeight / 2) - 200,
    scaleX: 1.4,
    scaleY: 1.2,
    skewX: -0.2,
    skewY: 0.2,
  },
  {
    width: 120,
    height: 160,
    left: -(window.innerWidth / 2) - 120,
    top: (window.innerHeight / 2) - 180,
    scaleX: -1.4,
    scaleY: 1,
    skewX: -0.2,
    skewY: 0.2,
  },
];

/**
 * @param {CanvasRenderingContext2D} ctx
 */
const animateSnowFlakes = (ctx) => {
  const img = new Image();

  const draw = () => {
    params.forEach(({
      width,
      height,
      left,
      top,
      scaleX,
      scaleY,
      skewX,
      skewY,
    }) => {
      ctx.save();
      ctx.scale(scaleX, scaleY);
      skew(ctx, skewX, skewY);
      ctx.drawImage(img, left, top, width, height);
      ctx.restore();
    });
  };

  img.onload = () => {
    draw();
  };

  img.src = `/img/win-primary-images/snowflake.png`;
};

export default animateSnowFlakes;

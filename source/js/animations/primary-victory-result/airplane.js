/**
 * @param {CanvasRenderingContext2D} ctx
 */
const animateTree2 = (ctx) => {
  const width = 50;
  const height = 159;
  const left = (window.innerWidth / 2) + 70;
  const top = (window.innerHeight / 2) - 130;

  const img = new Image();

  const draw = () => {
    ctx.drawImage(img, left, top, width, height);
  };

  img.onload = () => {
    ctx.save();
    draw();
    ctx.restore();
  };

  img.src = `/img/win-primary-images/tree-2.png`;
};

/**
 * @param {CanvasRenderingContext2D} ctx
 */
const animateTree1 = (ctx) => {
  const width = 38;
  const height = 101;
  const left = (window.innerWidth / 2) + 110;
  const top = (window.innerHeight / 2) - 90;

  const img = new Image();

  const draw = () => {
    ctx.drawImage(img, left, top, width, height);
  };

  img.onload = () => {
    ctx.save();
    draw();
    ctx.restore();
  };

  img.src = `/img/win-primary-images/tree.png`;
};

/**
 * @param {CanvasRenderingContext2D} ctx
 */
const animatePlane = (ctx) => {
  const width = 120;
  const height = 116;
  const left = (window.innerWidth / 2) + 300;
  const top = (window.innerHeight / 2) - 200;

  const img = new Image();

  const draw = () => {
    ctx.drawImage(img, left, top, width, height);
  };

  img.onload = () => {
    ctx.save();
    draw();
    ctx.restore();
  };

  img.src = `/img/win-primary-images/airplane.png`;
};

/**
 * @param {CanvasRenderingContext2D} ctx
 */
const animateTrail = (ctx) => {
  const width = 586;
  const height = 324;
  const left = (window.innerWidth / 2) - 260;
  const top = (window.innerHeight / 2) - 212;

  const img = new Image();

  const draw = () => {
    ctx.drawImage(img, left, top, width, height);
  };

  img.onload = () => {
    ctx.save();
    draw();
    ctx.restore();
  };

  img.src = `/img/win-primary-images/back.png`;
};

/**
 * @param {CanvasRenderingContext2D} ctx
 */
const animateFlying = (ctx) => {
  animatePlane(ctx);
  animateTrail(ctx);
  setTimeout(() => {
    animateTree1(ctx);
    animateTree2(ctx);
  }, 200);
};

export default animateFlying;
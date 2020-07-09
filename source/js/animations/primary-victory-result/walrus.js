const width = 408;
const height = 273;
const top = (window.innerHeight - height) / 2;
const left = (window.innerWidth - width) / 2;

/**
 * @param {CanvasRenderingContext2D} ctx
 */
const animateWalrus = (ctx) => {
  const img = new Image();

  const draw = () => {
    ctx.drawImage(img, left, top, width, height);
  };

  img.onload = () => {
    draw();
  };

  img.src = `/img/win-primary-images/walrus.png`;
};

export default animateWalrus;

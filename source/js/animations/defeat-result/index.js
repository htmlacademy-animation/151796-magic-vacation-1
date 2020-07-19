import {animateDuration} from '../helpers';
import lock from './lock';
import items from './items';

const TOTAL_ANIMATION_DURATION = 8 * 1000;

const defeatResult = async (target) => {
  const imageWrapElement = document.querySelector(`#${target} .result__image`);

  try {
    const canvasDom = document.getElementById(`defeat-result`);
    const ctx = canvasDom.getContext(`2d`);

    const lockAnimation = lock(ctx);
    const itemsAnimation = await items(ctx);

    canvasDom.width = window.innerWidth;
    canvasDom.height = window.innerHeight;

    const render = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      lockAnimation.draw();
      itemsAnimation.draw();
    };

    lockAnimation.animate();
    itemsAnimation.animate();

    animateDuration(render, TOTAL_ANIMATION_DURATION);
  } catch (e) {
    if (imageWrapElement) {
      imageWrapElement.innerHTML = `
<picture>
  <source srcset="img/result3-mob.png 1x, img/result3-mob@2x.png 2x" media="(max-width: 768px) and (orientation: portrait)">
  <img src="img/result3.png" srcset="img/result3@2x.png 2x" alt="">
</picture>
      `;
    }
  }
};

export default defeatResult;

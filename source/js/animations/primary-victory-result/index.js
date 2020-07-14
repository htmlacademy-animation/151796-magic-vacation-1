import walrus from './walrus';
import airplane from './airplane';
import {animateDuration} from '../helpers';

const TOTAL_ANIMATION_DURATION = 3000;

const primaryVictoryResult = async (target) => {
  const imageWrapElement = document.querySelector(`#${target} .result__image`);

  let airplaneAnimation;
  let walrusAnimation;

  try {
    const canvasDom = document.getElementById(`primary-victory-result`);
    const ctx = canvasDom.getContext(`2d`);

    airplaneAnimation = await airplane(ctx);
    walrusAnimation = await walrus(ctx);

    canvasDom.width = window.innerWidth;
    canvasDom.height = window.innerHeight;

    const render = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      airplaneAnimation.draw();
      // walrusAnimation.draw();
    };

    airplaneAnimation.animate();
    // walrusAnimation.animate();

    animateDuration(render, TOTAL_ANIMATION_DURATION);
  } catch (e) {
    if (imageWrapElement) {
      imageWrapElement.innerHTML = `
<picture>
  <source srcset="img/result1-mob.png 1x, img/result1-mob@2x.png 2x" media="(max-width: 768px) and (orientation: portrait)">
  <img src="img/result1.png" srcset="img/result1@2x.png 2x" alt="">
</picture>
      `;
    }
  }
};

export default primaryVictoryResult;

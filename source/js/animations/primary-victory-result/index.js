import walrus from './walrus';
import airplane from './airplane';
import snowflakes from './snowflakes';
import {animateDuration} from '../helpers';

const TOTAL_ANIMATION_DURATION = 8 * 1000;

const primaryVictoryResult = async (target) => {
  const imageWrapElement = document.querySelector(`#${target} .result__image`);

  try {
    const canvasDom = document.getElementById(`primary-victory-result`);
    const ctx = canvasDom.getContext(`2d`);

    const airplaneAnimation = await airplane(ctx);
    const walrusAnimation = await walrus(ctx);
    const snowflakesAnimation = await snowflakes(ctx);

    canvasDom.width = window.innerWidth;
    canvasDom.height = window.innerHeight;

    const render = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      airplaneAnimation.draw();
      walrusAnimation.draw();
      snowflakesAnimation.draw();
    };

    airplaneAnimation.animate();
    walrusAnimation.animate();
    snowflakesAnimation.animate();

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

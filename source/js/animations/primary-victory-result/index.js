import animateWalrus from './walrus';
import animateSnowFlakes from './snowflakes';
import animateFlying from './airplane';

const canvasDom = document.getElementById(`primary-victory-result`);
const ctx = canvasDom.getContext(`2d`);

const animatePrimaryVictoryResult = () => {
  canvasDom.width = window.innerWidth;
  canvasDom.height = window.innerHeight;

  animateFlying(ctx);
  setTimeout(() => {
    animateWalrus(ctx);
    animateSnowFlakes(ctx);
  }, 300);
};

export default animatePrimaryVictoryResult;

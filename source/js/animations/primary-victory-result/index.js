import walrus from './walrus';
import animateSnowFlakes from './snowflakes';
import animateFlying from './airplane';

const canvasDom = document.getElementById(`primary-victory-result`);
const ctx = canvasDom.getContext(`2d`);

const animatePrimaryVictoryResult = () => {
  canvasDom.width = window.innerWidth;
  canvasDom.height = window.innerHeight;

  // animateFlying(ctx);
  // setTimeout(() => {
  //   animateSnowFlakes(ctx);
  // }, 300);
  walrus(ctx);
};

export default animatePrimaryVictoryResult;

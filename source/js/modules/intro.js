import animateText from '../utils/animatedText';
import IntroScene from '../scenes/IntroScene';

export default () => {
  const titleAnimation = animateText({
    selector: `.intro__title`,
  });
  const dateAnimation = animateText({
    selector: `.intro__date`,
    offset: 40,
  });

  const scene = new IntroScene();

  document.body.addEventListener(`screenVisuallyChanged`, (e) => {
    if (titleAnimation && dateAnimation) {
      if (e && e.detail && e.detail.screenName === `top`) {
        scene.init();
        setTimeout(() => {
          titleAnimation.start();
        }, 500);
        setTimeout(() => {
          dateAnimation.start();
        }, 1500);
      } else {
        scene.stop();
        titleAnimation.destroy();
        dateAnimation.destroy();
      }
    }
  });
};

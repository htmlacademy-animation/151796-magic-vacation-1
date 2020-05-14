import animateText from '../utils/animatedText';

export default () => {
  const titleAnimation = animateText({
    selector: `.intro__title`,
  });
  const dateAnimation = animateText({
    selector: `.intro__date`,
    offset: 40,
  });

  document.body.addEventListener(`screenVisuallyChanged`, (e) => {
    if (titleAnimation && dateAnimation) {
      if (e && e.detail && e.detail.screenName === `top`) {
        setTimeout(() => {
          titleAnimation.start();
        }, 500);
        setTimeout(() => {
          dateAnimation.start();
        }, 1500);
      } else {
        titleAnimation.destroy();
        dateAnimation.destroy();
      }
    }
  });
};

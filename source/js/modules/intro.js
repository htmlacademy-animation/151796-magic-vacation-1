import animateText from '../utils/animatedText';

export default () => {
  const titleStartAnimation = animateText({
    selector: `.intro__title`,
  });
  const dateStartAnimation = animateText({
    selector: `.intro__date`,
    offset: 40,
  });
  if (titleStartAnimation && dateStartAnimation) {
    setTimeout(() => {
      titleStartAnimation();
    }, 500);
    setTimeout(() => {
      dateStartAnimation();
    }, 1500);
  }
};

import animatedText from '../utils/animatedText';

export default () => {
  const startAnimation = animatedText({
    selector: `.intro__title`,
  });
  if (startAnimation) {
    setTimeout(() => {
      startAnimation();
    }, 1000);
  }
};

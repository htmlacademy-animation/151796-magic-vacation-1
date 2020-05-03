const INTRO_CONTENT_ANIMATION_DURATION = 500;

export default () => {
  const introContent = document.querySelector(`#intro-content`);

  document.body.addEventListener(`screenChanged`, e => {
    if (e && e.detail && e.detail.screenName === `top` && introContent) {
      introContent.classList.add(`intro__content--animating`);
      setTimeout(() => {
        if (introContent) {
          introContent.classList.remove(`intro__content--animating`);
        }
      }, INTRO_CONTENT_ANIMATION_DURATION);
    }
  });
};

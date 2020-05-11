import animate from '../utils/animate';

export default () => {
  const introContent = document.querySelector(`#intro-content`);

  document.body.addEventListener(`screenChanged`, (e) => {
    if (e && e.detail && e.detail.screenName === `top` && introContent) {
      animate({
        elems: [introContent],
        classname: `intro__content`,
        duration: 500,
      });
    }
  });
};

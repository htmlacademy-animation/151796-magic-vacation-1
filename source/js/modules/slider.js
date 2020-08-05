import Swiper from 'swiper';

import HistoryScene from '../scenes/HistoryScene';

const clearActiveElement = (slider) => () => {
  if (slider && slider.slides) {
    Object.keys(slider.slides).forEach((key) => {
      const elem = slider.slides[key];
      if (elem && elem.classList) {
        elem.classList.remove(`slider__item--active`);
      }
    });
  }
};

export default () => {
  const scene = new HistoryScene();
  let storySlider;

  const setSlider = function () {
    let textFadeIn;

    if (((window.innerWidth / window.innerHeight) < 1) || window.innerWidth < 769) {
      textFadeIn = (slider) => () => {
        clearActiveElement(slider)();
        const currentElem = slider.slides[slider.activeIndex];
        if (currentElem) {
          currentElem.classList.add(`slider__item--active`);
        }
      };
      storySlider = new Swiper(`.js-slider`, {
        pagination: {
          el: `.swiper-pagination`,
          type: `bullets`
        },
        keyboard: {
          enabled: true
        },
        on: {
          slideChange: () => {
            if (storySlider.activeIndex === 0 || storySlider.activeIndex === 1) {
              scene.moveCameraTo(0);
            } else if (storySlider.activeIndex === 2 || storySlider.activeIndex === 3) {
              scene.moveCameraTo(1);
            } else if (storySlider.activeIndex === 4 || storySlider.activeIndex === 5) {
              scene.moveCameraTo(2);
            } else if (storySlider.activeIndex === 6 || storySlider.activeIndex === 7) {
              scene.moveCameraTo(3);
            }

            textFadeIn(storySlider)();
          },
          resize: () => {
            storySlider.update();
          }
        },
        observer: true,
        observeParents: true
      });
    } else {
      textFadeIn = (slider) => () => {
        clearActiveElement(slider)();
        const currentElem = slider.slides[slider.activeIndex];
        const nextElem = slider.slides[slider.activeIndex + 1];
        if (currentElem) {
          currentElem.classList.add(`slider__item--active`);
        }
        if (nextElem) {
          nextElem.classList.add(`slider__item--active`);
        }
      };

      storySlider = new Swiper(`.js-slider`, {
        slidesPerView: 2,
        slidesPerGroup: 2,
        pagination: {
          el: `.swiper-pagination`,
          type: `fraction`
        },
        navigation: {
          nextEl: `.js-control-next`,
          prevEl: `.js-control-prev`,
        },
        keyboard: {
          enabled: true
        },
        on: {
          slideChange: () => {
            if (storySlider.activeIndex === 0) {
              scene.moveCameraTo(0);
            } else if (storySlider.activeIndex === 2) {
              scene.moveCameraTo(1);
            } else if (storySlider.activeIndex === 4) {
              scene.moveCameraTo(2);
            } else if (storySlider.activeIndex === 6) {
              scene.moveCameraTo(3);
            }

            textFadeIn(storySlider)();
          },
          resize: () => {
            storySlider.update();
          }
        },
        observer: true,
        observeParents: true,
        allowTouchMove: false,
      });
    }

    setTimeout(() => {
      textFadeIn(storySlider)();
    }, 0);
  };

  window.addEventListener(`resize`, function () {
    if (storySlider) {
      storySlider.destroy();
    }
    setSlider();
  });

  document.body.addEventListener(`screenVisuallyChanged`, (e) => {
    if (e && e.detail && e.detail.screenName === `story`) {
      scene.init();
      if (storySlider) {
        storySlider.destroy();
      }
      setSlider();
    } else {
      scene.stop();
    }
  });
};

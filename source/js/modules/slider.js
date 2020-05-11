import Swiper from "swiper";

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
  let storySlider;
  let sliderContainer = document.getElementById(`story`);
  sliderContainer.style.backgroundImage = `url("img/slide1.jpg"), linear-gradient(180deg, rgba(83, 65, 118, 0) 0%, #523E75 16.85%)`;

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
              sliderContainer.style.backgroundImage = `url("img/slide1.jpg"), linear-gradient(180deg, rgba(83, 65, 118, 0) 0%, #523E75 16.85%)`;
            } else if (storySlider.activeIndex === 2 || storySlider.activeIndex === 3) {
              sliderContainer.style.backgroundImage = `url("img/slide2.jpg"), linear-gradient(180deg, rgba(45, 54, 179, 0) 0%, #2A34B0 16.85%)`;
            } else if (storySlider.activeIndex === 4 || storySlider.activeIndex === 5) {
              sliderContainer.style.backgroundImage = `url("img/slide3.jpg"), linear-gradient(180deg, rgba(92, 138, 198, 0) 0%, #5183C4 16.85%)`;
            } else if (storySlider.activeIndex === 6 || storySlider.activeIndex === 7) {
              sliderContainer.style.backgroundImage = `url("img/slide4.jpg"), linear-gradient(180deg, rgba(45, 39, 63, 0) 0%, #2F2A42 16.85%)`;
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
              sliderContainer.style.backgroundImage = `url("img/slide1.jpg")`;
            } else if (storySlider.activeIndex === 2) {
              sliderContainer.style.backgroundImage = `url("img/slide2.jpg")`;
            } else if (storySlider.activeIndex === 4) {
              sliderContainer.style.backgroundImage = `url("img/slide3.jpg")`;
            } else if (storySlider.activeIndex === 6) {
              sliderContainer.style.backgroundImage = `url("img/slide4.jpg")`;
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

  document.body.addEventListener(`screenChanged`, (e) => {
    if (e && e.detail && e.detail.screenName === `story`) {
      if (storySlider) {
        storySlider.destroy();
      }
      setSlider();
    }
  });
};

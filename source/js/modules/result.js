import primaryVictoryResult from '../animations/primary-victory-result';
import defeatResult from '../animations/defeat-result';

const animateTitle = (screenId) => {
  const titleSvg = document.querySelector(`#${screenId} .result__svg-title`);
  if (titleSvg) {
    const type = titleSvg.getAttribute(`data-type`);
    let letterDelay = 200;

    const paths = titleSvg.querySelectorAll(`path`);
    paths.forEach((path) => {
      const len = path.getTotalLength();
      const animateStrokeDashArray = document.createElementNS(`http://www.w3.org/2000/svg`, `animate`);

      path.setAttribute(`stroke-dasharray`, `0 ` + Math.ceil(len / 3));
      animateStrokeDashArray.setAttribute(`attributeName`, `stroke-dasharray`);
      animateStrokeDashArray.setAttribute(`from`, `0 ${Math.ceil(len / 3)}`);
      animateStrokeDashArray.setAttribute(`to`, `${Math.ceil(len / 3)} 0`);
      animateStrokeDashArray.setAttribute(`fill`, `freeze`);
      if (type === `defeat`) {
        animateStrokeDashArray.setAttribute(`begin`, `start + ${letterDelay}ms`);
        animateStrokeDashArray.setAttribute(`dur`, `0.5s`);
      } else {
        animateStrokeDashArray.setAttribute(`begin`, `start`);
        animateStrokeDashArray.setAttribute(`dur`, `0.6s`);
      }

      path.appendChild(animateStrokeDashArray);

      if (type === `defeat`) {
        const animateTransition = document.createElementNS(`http://www.w3.org/2000/svg`, `animateTransform`);

        animateTransition.setAttribute(`attributeName`, `transform`);
        animateTransition.setAttribute(`type`, `translate`);
        animateTransition.setAttribute(`values`, `0 -50; 0 60; 0 45; 0 50`);
        animateTransition.setAttribute(`keyTimes`, `0; 0.85; 0.93; 1`);
        animateTransition.setAttribute(`calcMode`, `spline`);
        animateTransition.setAttribute(`keySplines`, `0.11 0 0.92 0.41; 0.25 1 0.5 1; 0.37 0 0.63 1`);
        animateTransition.setAttribute(`dur`, `0.8s`);
        animateTransition.setAttribute(`additive`, `sum`);
        animateTransition.setAttribute(`fill`, `freeze`);
        animateTransition.setAttribute(`begin`, `start + ${letterDelay}ms`);

        letterDelay += 40;

        path.appendChild(animateTransition);
      }

      path.dispatchEvent(new Event(`start`));
    });
  }
  titleSvg.classList.add(`result__svg-title--displayed`);
};

const previewAnimation = {
  result: primaryVictoryResult,
  result3: defeatResult,
};

const animatePreview = (target) => {
  if (previewAnimation[target]) {
    previewAnimation[target](target);
  }
};

export default () => {
  let showResultEls = document.querySelectorAll(`.js-show-result`);
  let results = document.querySelectorAll(`.screen--result`);
  if (results.length) {
    for (let i = 0; i < showResultEls.length; i++) {
      showResultEls[i].addEventListener(`click`, function () {
        let target = showResultEls[i].getAttribute(`data-target`);
        [].slice.call(results).forEach(function (el) {
          el.classList.remove(`screen--show`);
          el.classList.add(`screen--hidden`);
        });
        let targetEl = [].slice.call(results).filter(function (el) {
          return el.getAttribute(`id`) === target;
        });
        targetEl[0].classList.add(`screen--show`);
        targetEl[0].classList.remove(`screen--hidden`);
        animatePreview(target);
        animateTitle(target);
      });
    }

    let playBtn = document.querySelector(`.js-play`);
    if (playBtn) {
      playBtn.addEventListener(`click`, function () {
        [].slice.call(results).forEach(function (el) {
          el.classList.remove(`screen--show`);
          el.classList.add(`screen--hidden`);
        });
        document.getElementById(`messages`).innerHTML = ``;
        document.getElementById(`message-field`).focus();
      });
    }
  }
};

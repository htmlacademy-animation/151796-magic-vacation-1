const animateTitle = (screenId) => {
  const titleSvg = document.querySelector(`#${screenId} .game__victory-title`);
  if (titleSvg) {
    const paths = titleSvg.querySelectorAll(`path`);
    paths.forEach((path) => {
      const len = path.getTotalLength();
      const animate = document.createElementNS(`http://www.w3.org/2000/svg`, `animate`);

      path.setAttribute(`stroke-dasharray`, `0 ` + Math.ceil(len / 3));
      animate.setAttribute(`attributeName`, `stroke-dasharray`);
      animate.setAttribute(`from`, `0 ${Math.ceil(len / 3)}`);
      animate.setAttribute(`to`, `${Math.ceil(len / 3)} 0`);
      animate.setAttribute(`dur`, `0.6s`);
      animate.setAttribute(`begin`, `start`);
      animate.setAttribute(`fill`, `freeze`);

      path.appendChild(animate);
      path.dispatchEvent(new Event(`start`));
    });
  }
  titleSvg.classList.add(`game__victory-title--displayed`);
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

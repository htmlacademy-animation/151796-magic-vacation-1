import {sleep} from '../utils';
import CountUp from '../utils/CountUp';

const countCallback = (element) => (val) => {
  if (element) {
    element.innerHTML = val.toString();
  }
};

const prizesData = [
  {
    desktopImagePath: `img/primary-award.svg`,
    previewElementId: `primary-award-preview`,
    duration: 4000,
    elementId: `primary-award`,
  },
  {
    desktopImagePath: `img/secondary-award.svg`,
    previewElementId: `secondary-award-preview`,
    duration: 2000,
    elementId: `secondary-award`,
    countAnimation: {
      from: 1,
      to: 7,
      fps: 12,
      step: 1,
      callback: countCallback,
      delay: 1 * 1000,
    },
  },
  {
    desktopImagePath: `img/additional-award.svg`,
    previewElementId: `additional-award-preview`,
    duration: 3200,
    elementId: `additional-award`,
    countAnimation: {
      from: 11,
      to: 900,
      fps: 12,
      step: Math.floor((900 - 11) / 10),
      callback: countCallback,
      delay: 1.2 * 1000,
    },
  },
];

let animatesHaveCompleted = false;

const prizes = () => {
  document.body.addEventListener(`screenVisuallyChanged`, async (e) => {
    if (e && e.detail && e.detail.screenName === `prizes` && !animatesHaveCompleted) {
      animatesHaveCompleted = true;
      for (const {previewElementId, desktopImagePath, duration, elementId, countAnimation} of prizesData) {
        const element = document.getElementById(previewElementId);
        if (element) {
          element.src = desktopImagePath;
        }

        if (countAnimation && elementId) {
          const countElement = document.querySelector(`#${elementId} .prizes__desc b`);
          if (countElement) {
            countElement.innerHTML = countAnimation.from.toString();
          }

          setTimeout(() => {
            const countUp = new CountUp({
              from: countAnimation.from,
              to: countAnimation.to,
              fps: countAnimation.fps,
              step: countAnimation.step,
              callback: countAnimation.callback(countElement)
            });
            countUp.start();
          }, countAnimation.delay);
        }

        await sleep(duration);
      }
      const screen = document.querySelector(`#prizes`);
      if (screen) {
        screen.classList.remove(`screen--animates-have-not-completed`);
        screen.classList.add(`screen--animates-have-completed`);
      }
    }
  });
};

export default prizes;

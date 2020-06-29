import {sleep} from '../utils';

const prizesData = [
  {
    desktopImagePath: `img/primary-award.svg`,
    elementId: `primary-award-preview`,
    duration: 4000,
  },
  {
    desktopImagePath: `img/secondary-award.svg`,
    elementId: `secondary-award-preview`,
    duration: 2000,
  },
  {
    desktopImagePath: `img/additional-award.svg`,
    elementId: `additional-award-preview`,
    duration: 3200,
  },
];

let animatesHaveCompleted = false;

const prizes = () => {
  document.body.addEventListener(`screenVisuallyChanged`, async (e) => {
    if (e && e.detail && e.detail.screenName === `prizes` && !animatesHaveCompleted) {
      animatesHaveCompleted = true;
      for (const {elementId, desktopImagePath, duration} of prizesData) {
        const element = document.getElementById(elementId);
        if (element) {
          element.src = desktopImagePath;
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

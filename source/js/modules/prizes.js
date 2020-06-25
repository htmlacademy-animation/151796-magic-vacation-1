import {sleep} from '../utils';

const prizesData = [
  {
    desktopImagePath: `img/primary-award.svg`,
    elementId: `primary-award-preview`,
  },
  {
    desktopImagePath: `img/secondary-award.svg`,
    elementId: `secondary-award-preview`,
  },
];

const PRIZES_DELAY = 3500;

const prizes = () => {
  document.body.addEventListener(`screenVisuallyChanged`, async (e) => {
    if (e && e.detail && e.detail.screenName === `prizes`) {
      for (const {elementId, desktopImagePath} of prizesData) {
        const element = document.getElementById(elementId);
        if (element) {
          element.src = desktopImagePath;
        }
        await sleep(PRIZES_DELAY);
      }
    }
  });
};

export default prizes;

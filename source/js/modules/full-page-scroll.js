import throttle from 'lodash/throttle';

export default class FullPageScroll {
  constructor() {
    this.THROTTLE_TIMEOUT = 2000;
    this.OVERLAY_DURATION = 1000;

    this.screenElements = document.querySelectorAll(`.screen:not(.screen--result)`);
    this.menuElements = document.querySelectorAll(`.page-header__menu .js-menu-link`);
    this.overlay = document.querySelector(`.screen__overlay`);

    this.activeScreen = 0;
    this.prevScreen = this.activeScreen;
    this.onScrollHandler = this.onScroll.bind(this);
    this.onUrlHashChengedHandler = this.onUrlHashChanged.bind(this);
  }

  init() {
    document.addEventListener(`wheel`, throttle(this.onScrollHandler, this.THROTTLE_TIMEOUT));
    window.addEventListener(`popstate`, this.onUrlHashChengedHandler);

    this.onUrlHashChanged();

    if (this.screenElements[this.activeScreen].id === `story`) {

    }

    this.changePageDisplay();
  }

  onScroll(evt) {
    const currentPosition = this.activeScreen;
    this.reCalculateActiveScreenPosition(evt.deltaY);
    if (currentPosition !== this.activeScreen) {
      this.changePageDisplay();
    }
  }

  onUrlHashChanged() {
    const newIndex = Array.from(this.screenElements).findIndex((screen) => location.hash.slice(1) === screen.id);
    this.activeScreen = (newIndex < 0) ? 0 : newIndex;
    this.changePageDisplay();
  }

  changePageDisplay() {
    this.changeVisibilityDisplay();
    this.changeActiveMenuItem();
    this.emitChangeDisplayEvent();
    this.prevScreen = this.activeScreen;
  }

  activateScreen() {
    this.screenElements.forEach((screen) => {
      screen.classList.add(`screen--hidden`);
      screen.classList.remove(`screen--active`);
    });

    this.screenElements[this.activeScreen].classList.remove(`screen--hidden`);
    this.screenElements[this.activeScreen].classList.add(`active`);
  }

  changeVisibilityDisplay() {
    const activeScreenName = this.screenElements[this.activeScreen].id;
    const prevScreenName = this.screenElements[this.prevScreen].id;

    const fromStory = prevScreenName === `story` && activeScreenName !== `story`;
    const toStory = activeScreenName === `story` && prevScreenName !== `story`;
    const overlayHasChanged = fromStory || toStory;

    if (overlayHasChanged) {
      this.overlay.classList.remove(`screen__overlay--hidden`);
    }

    setTimeout(() => {
      if (fromStory) {
        this.overlay.classList.add(`screen__overlay--active`);
      } else if (toStory) {
        this.overlay.classList.remove(`screen__overlay--active`);
      }

      if (!fromStory) {
        this.activateScreen();
      }
    }, 0);

    setTimeout(() => {
      if (overlayHasChanged) {
        this.overlay.classList.add(`screen__overlay--hidden`);
      }

      if (fromStory) {
        this.activateScreen();
      }
    }, this.OVERLAY_DURATION);
  }

  changeActiveMenuItem() {
    const activeItem = Array.from(this.menuElements).find((item) => item.dataset.href === this.screenElements[this.activeScreen].id);
    if (activeItem) {
      this.menuElements.forEach((item) => item.classList.remove(`active`));
      activeItem.classList.add(`active`);
    }
  }

  emitChangeDisplayEvent() {
    const event = new CustomEvent(`screenChanged`, {
      detail: {
        'screenId': this.activeScreen,
        'screenName': this.screenElements[this.activeScreen].id,
        'screenElement': this.screenElements[this.activeScreen]
      }
    });

    document.body.dispatchEvent(event);
  }

  reCalculateActiveScreenPosition(delta) {
    if (delta > 0) {
      this.activeScreen = Math.min(this.screenElements.length - 1, ++this.activeScreen);
    } else {
      this.activeScreen = Math.max(0, --this.activeScreen);
    }
  }
}

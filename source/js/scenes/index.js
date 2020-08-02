import introScene from './intro';

const scenes = () => {
  let ww = window.innerWidth;
  let wh = window.innerHeight;

  let renderIntro = introScene();

  const hasResized = () => {
    if (ww !== window.innerWidth || wh !== window.innerHeight) {
      ww = window.innerWidth;
      wh = window.innerHeight;

      return true;
    }

    return false;
  };

  const render = () => {
    if (hasResized()) {
      renderIntro = introScene();
    }

    renderIntro();
    requestAnimationFrame(render);
  };

  render();
};

export default scenes;

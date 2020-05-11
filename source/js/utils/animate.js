/**
 * @param {HTMLElement[]} elems
 * @param {number} duration
 * @param {string} classname
 */
const animate = ({
  elems,
  duration,
  classname,
}) => {
  elems.forEach((elem) => {
    elem.classList.add(`${classname}--animating`);
    setTimeout(() => {
      if (elem) {
        elem.classList.remove(`${classname}--animating`);
      }
    }, duration);
  });
};

export default animate;

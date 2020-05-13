/**
 * @param {HTMLElement} elem
 * @param {string} property
 * @param {number} offset
 * @param {number} duration
 * @return {string}
 */
const getWrappedContent = ({
  elem,
  property,
  offset,
  duration
}) => {
  const text = elem.textContent;
  let timeOffset = 0;

  return text.trim().split(` `).filter((word) => word).reduce((html, word) => `
${html}
<span class="animated-word">
  ${word.split(``).reduce((wordHtml, letter) => {
    timeOffset += offset;

    return `
      ${wordHtml}
      <span class="animated-letter" style="transition: ${property} ${duration}ms ease ${timeOffset}ms">${letter}</span>
    `;
  }, ``)}
</span>
`, ``);
};

/**
 * @param {string} selector
 * @param {string} [property=transform]
 * @param {number} [offset=20]
 * @param {number} [duration=500]
 * @return {null | function}
 */
const animatedText = ({
  selector,
  property = `transform`,
  offset = 20,
  duration = 500,
}) => {
  const elem = document.querySelector(selector);
  if (!elem) {
    return null;
  }

  elem.innerHTML = getWrappedContent({
    elem,
    property,
    offset,
    duration,
  });

  return () => {
    if (elem) {
      elem.classList.add(`animated-text--active`);
    }
  };
};

export default animatedText;

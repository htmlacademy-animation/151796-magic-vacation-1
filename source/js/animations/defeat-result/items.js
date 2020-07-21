import {animateDuration, defaultAnimationTick, scale, rotate, animateEasing} from '../helpers';
import bezierEasing from '../bezierEasing';

const ITEMS_ROOT_PATH = `img/lose-images/`;

const APPEARING_ANIMATION_DURATION = 400;
const APPEARING_ANIMATION_DELAY = 50;
const FALLING_ANIMATION_DURATION = 500;

const halfWW = window.innerWidth / 2;
const halfWH = window.innerHeight / 2;

const itemsData = [
  {
    path: `flamingo.png`,
    width: 103,
    height: 117,
    position: {
      from: {
        x: halfWW - 200,
        y: halfWH - 100,
      },
      to: {
        x: halfWW - 330,
        y: halfWH - 170,
      }
    },
    rotation: {
      from: 100,
      to: 0,
    },
    fallDelay: 130,
  },
  {
    path: `leaf.png`,
    width: 83,
    height: 102,
    position: {
      from: {
        x: halfWW + 100,
        y: halfWH - 100,
      },
      to: {
        x: halfWW + 375,
        y: halfWH - 210,
      }
    },
    rotation: {
      from: -80,
      to: 0,
    },
    fallDelay: 0,
  },
  {
    path: `saturn.png`,
    width: 144,
    height: 92,
    position: {
      from: {
        x: halfWW + 100,
        y: halfWH + 100,
      },
      to: {
        x: halfWW + 290,
        y: halfWH + 170,
      }
    },
    rotation: {
      from: 120,
      to: 0,
    },
    fallDelay: 100,
  },
  {
    path: `snowflake.png`,
    width: 91,
    height: 106,
    position: {
      from: {
        x: halfWW + 50,
        y: halfWH,
      },
      to: {
        x: halfWW + 170,
        y: halfWH - 25,
      }
    },
    rotation: {
      from: -30,
      to: 0,
    },
    fallDelay: 150,
  },
  {
    path: `watermelon.png`,
    width: 97,
    height: 79,
    position: {
      from: {
        x: halfWW - 200,
        y: halfWH + 100,
      },
      to: {
        x: halfWW - 500,
        y: halfWH + 170,
      }
    },
    rotation: {
      from: 60,
      to: 0,
    },
    fallDelay: 70,
  },
];

/**
 * @param {CanvasRenderingContext2D} ctx
 * @return {Promise<{draw: function, animate: function}>}
 */
const items = (ctx) => new Promise((resolve, reject) => {
  const itemsPositions = [
    {x: 0, y: 0},
    {x: 0, y: 0},
    {x: 0, y: 0},
    {x: 0, y: 0},
    {x: 0, y: 0},
  ];
  const itemsAngles = [
    0,
    0,
    0,
    0,
    0,
  ];

  let loadedImages = 0;
  let scaleSize = 0;

  /**
   * @param {{x: number, y: number}} from
   * @param {{x: number, y: number}} to
   * @param {number} index
   * @return {function(...[*]=)}
   */
  const positionAnimationTick = (from, to, index) => (progress) => {
    itemsPositions[index].x = defaultAnimationTick(from.x, to.x, progress);
    itemsPositions[index].y = defaultAnimationTick(from.y, to.y, progress);
  };

  const angleAnimationTick = (from, to, index) => (progress) => {
    itemsAngles[index] = defaultAnimationTick(from, to, progress);
  };

  const scaleAnimationTick = (from, to) => (progress) => {
    scaleSize = defaultAnimationTick(from, to, progress);
  };

  /**
   * @param {number} width
   * @param {number} height
   * @param {{x: number, y: number}} position
   * @return {{x: number, y: number}}
   */
  const getItemCenter = (width, height, position) => ({
    x: position.x + width / 2,
    y: position.y + height / 2,
  });

  let images = [];

  const draw = () => {
    images.forEach((image, index) => {
      const {
        width,
        height,
      } = itemsData[index];
      const {x, y} = itemsPositions[index];

      ctx.save();

      const itemCenter = getItemCenter(width, height, itemsPositions[index]);
      scale(ctx, scaleSize, scaleSize);
      rotate(ctx, itemsAngles[index], itemCenter.x, itemCenter.y);
      ctx.drawImage(image, x, y, width, height);

      ctx.restore();
    });
  };

  const animate = () => {
    setTimeout(() => {
      itemsData.forEach(({position, rotation, fallDelay}, index) => {
        animateEasing(
            positionAnimationTick(position.from, position.to, index),
            APPEARING_ANIMATION_DURATION,
            bezierEasing(0.16, 1, 0.3, 1),
        );
        animateDuration(
            angleAnimationTick(rotation.from, rotation.to, index),
            APPEARING_ANIMATION_DURATION,
            bezierEasing(0.7, 0, 0.84, 0),
        );
        setTimeout(() => {
          animateEasing(
              positionAnimationTick(position.to, {x: position.to.x, y: window.innerHeight * 1.2}, index),
              FALLING_ANIMATION_DURATION,
              bezierEasing(0.7, 0, 0.84, 0),
          );
        }, APPEARING_ANIMATION_DURATION + fallDelay);
      });
      animateDuration(scaleAnimationTick(0, 1), APPEARING_ANIMATION_DURATION);
    }, APPEARING_ANIMATION_DELAY);
  };

  const onImageLoad = () => {
    loadedImages++;
    if (loadedImages === itemsData.length) {
      resolve({
        animate,
        draw,
      });
    }
  };

  itemsData.forEach((data, index) => {
    images.push(new Image());
    images[index].onload = onImageLoad;
    images[index].onerror = reject;
    images[index].src = `${ITEMS_ROOT_PATH}${data.path}`;
  });
});

export default items;

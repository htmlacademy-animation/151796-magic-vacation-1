export default class CountUp {
  /**
   * @param {number} from
   * @param {number} to
   * @param {number} interval
   * @param {function(val: *)} callback
   * @param {boolean} [time=false]
   */
  constructor({
    from,
    to,
    interval,
    callback,
    time,
  }) {
    this.from = from;
    this.to = to;
    this.value = from;
    this.interval = interval;
    this.direction = from > to ? `down` : `up`;

    const now = Date.now();
    this.now = now;
    this.then = now;

    this.callback = callback;

    this.transformToTime = time;

    this.animationRequestId = null;

    this.start = this.start.bind(this);
    this._provider = this._provider.bind(this);
  }

  start() {
    this.animationRequestId = requestAnimationFrame(this.start);

    this.now = Date.now();
    const elapsed = this.now - this.then;

    if (elapsed > this.interval) {
      this.value = this.direction === `up` ? this.value + this.interval : this.value - this.interval;
      let isRunOver;
      if (this.direction === `up`) {
        if (this.value >= this.to) {
          isRunOver = true;
          this.value = this.to;
        }
      } else {
        if (this.value <= this.to) {
          isRunOver = true;
          this.value = this.to;
        }
      }

      this.then = this.now - (elapsed % this.interval);

      this.callback(this._provider(this.value));

      if (isRunOver) {
        cancelAnimationFrame(this.animationRequestId);
      }
    }
  }

  /**
   * @param {number} val
   * @private
   * @return {*}
   */
  _provider(val) {
    if (this.transformToTime) {
      return {
        minutes: (val - (val % (1000 * 60))) / (1000 * 60),
        seconds: (val % (1000 * 60)) / (1000),
      };
    }

    return val;
  }
}

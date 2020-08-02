class Scene {
  constructor() {
    this.ww = window.innerWidth;
    this.wh = window.innerHeight;
    this.animationId = null;

    /**
     * @type {THREE.WebGLRenderer}
     */
    this.renderer = null;

    /**
     * @type {THREE.Scene}
     */
    this.scene = null;

    /**
     * @type {THREE.PerspectiveCamera}
     */
    this.camera = null;

    this.hasResized = this.hasResized.bind(this);
    this.stop = this.stop.bind(this);
    this.init = this.init.bind(this);
    this.render = this.render.bind(this);
  }

  hasResized() {
    if (this.ww !== window.innerWidth || this.wh !== window.innerHeight) {
      this.ww = window.innerWidth;
      this.wh = window.innerHeight;

      return true;
    }

    return false;
  }

  stop() {
    cancelAnimationFrame(this.animationId);
  }

  init() {
    throw new Error(`init() method is required.`);
  }

  render() {
    if (this.renderer && this.scene && this.camera) {
      if (this.hasResized()) {
        this.renderer.setSize(this.ww, this.wh);
        this.camera.aspect = this.ww / this.wh;
      }

      this.renderer.render(this.scene, this.camera);
      this.animationId = requestAnimationFrame(this.render);
    }
  }
}

export default Scene;

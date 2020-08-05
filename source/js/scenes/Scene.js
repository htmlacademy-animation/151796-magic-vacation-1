import * as THREE from 'three';

class Scene {
  constructor(canvasSelector) {
    this.ww = window.innerWidth;
    this.wh = window.innerHeight;
    this.animationId = null;
    this.canvas = document.querySelector(canvasSelector);

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1000,
    );
    this.camera.position.z = 1000;

    this.renderer = new THREE.WebGLRenderer({canvas: this.canvas});
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(`rgb(61, 48, 91)`);

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

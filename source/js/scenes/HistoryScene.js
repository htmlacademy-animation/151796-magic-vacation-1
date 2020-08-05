import * as THREE from 'three';
import Scene from './Scene';

class HistoryScene extends Scene {
  constructor() {
    super(`#history-scene`);

    this.scenes = [
      `img/scenes/scene-1.png`,
      `img/scenes/scene-2.png`,
      `img/scenes/scene-3.png`,
      `img/scenes/scene-4.png`,
    ];
    this.planeIndex = 0;

    this.moveCameraTo = this.moveCameraTo.bind(this);
    this.initPlanes = this.initPlanes.bind(this);
  }

  init() {
    this.initPlanes();
    this.render();
  }

  initPlanes() {
    const loadManager = new THREE.LoadingManager();
    const loader = new THREE.TextureLoader(loadManager);
    const planeGeometry = new THREE.PlaneGeometry(this.ww, this.wh);
    const planeMaterials = this.scenes.map((path) => new THREE.MeshBasicMaterial({map: loader.load(path)}));

    loadManager.onLoad = () => {
      planeMaterials.forEach((material, index) => {
        const plane = new THREE.Mesh(planeGeometry, material);
        plane.position.x = this.ww * index;
        this.scene.add(plane);
      });
    };
  }

  /**
   * @param {number} index
   */
  moveCameraTo(index) {
    this.planeIndex = index;
    this.camera.position.x = this.ww * index;
  }

  render() {
    if (this.hasResized()) {
      this.scene = new THREE.Scene();
      this.initPlanes();
      this.renderer.setSize(this.ww, this.wh);
      this.camera.aspect = this.ww / this.wh;
      this.moveCameraTo(this.planeIndex);
    }

    this.renderer.render(this.scene, this.camera);
    this.animationId = requestAnimationFrame(this.render);
  }
}

export default HistoryScene;

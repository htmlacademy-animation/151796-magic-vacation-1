import * as THREE from 'three';
import Scene from './Scene';

class IntroScene extends Scene {
  constructor() {
    super(`#intro-scene`);
  }

  init() {
    const loadManager = new THREE.LoadingManager();
    const texture = new THREE.TextureLoader(loadManager).load(`img/scenes/scene-0.png`);
    const planeMaterial = new THREE.MeshBasicMaterial({map: texture});
    const planeGeometry = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight);
    loadManager.onLoad = () => {
      const plane = new THREE.Mesh(planeGeometry, planeMaterial);
      this.scene.add(plane);
    };

    this.render();
  }
}

export default IntroScene;

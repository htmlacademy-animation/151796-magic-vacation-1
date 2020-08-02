import * as THREE from 'three';
import Scene from './Scene';

class IntroScene extends Scene {
  constructor() {
    super();

    this.canvas = document.querySelector(`#intro-scene`);

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
  }

  init() {
    const loadManager = new THREE.LoadingManager();
    const texture = new THREE.TextureLoader(loadManager).load(`/img/scenes/scene-0.png`);
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

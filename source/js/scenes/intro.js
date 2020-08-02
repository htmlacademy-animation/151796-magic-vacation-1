import * as THREE from 'three';

const introScene = () => {
  const canvas = document.querySelector(`#intro-scene`);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
  );
  camera.position.z = 1000;

  const renderer = new THREE.WebGLRenderer({canvas});
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(`rgb(61, 48, 91)`);

  const loadManager = new THREE.LoadingManager();
  const texture = new THREE.TextureLoader(loadManager).load(`/img/scenes/scene-0.png`);
  const planeMaterial = new THREE.MeshBasicMaterial({map: texture});
  const planeGeometry = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight);
  loadManager.onLoad = () => {
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    scene.add(plane);
  };

  return () => {
    renderer.render(scene, camera);
  };
};

export default introScene;

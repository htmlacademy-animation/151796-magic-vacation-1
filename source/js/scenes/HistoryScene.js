import * as THREE from 'three';
import Scene from './Scene';

class HistoryScene extends Scene {
  constructor() {
    super(`#history-scene`);

    /**
     * @type {{
     *   texture: string,
     *   hueCoeff?: number,
     * }[]}
     */
    this.scenes = [
      {
        texture: `img/scenes/scene-1.png`,
      },
      {
        texture: `img/scenes/scene-2.png`,
        hueCoeff: -0.2,
      },
      {
        texture: `img/scenes/scene-3.png`,
      },
      {
        texture: `img/scenes/scene-4.png`,
      },
    ];
    this.planeIndex = 0;

    this.vertexShader = `
uniform mat4 projectionMatrix;
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;

attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;

varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
}
`;

    this.fragmentShader = `
precision mediump float;

uniform sampler2D map;
uniform float hueCoeff;

varying vec2 vUv;

vec3 hueShift(vec3 color, float hue) {
  const vec3 k = vec3(0.57735);
  float cosAngle = cos(hue);

  return vec3(color * cosAngle + cross(k, color) * sin(hue) + k * dot(k, color) * (1.0 - cosAngle));
}

void main() {
  vec4 texel = texture2D(map, vUv);
  vec3 hueTexel = hueShift(texel.xyz, hueCoeff);
  gl_FragColor = vec4(hueTexel, 1);
}
`;

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
    const planeMaterials = this.scenes.map(({texture, hueCoeff = 0}) => new THREE.RawShaderMaterial({
      vertexShader: this.vertexShader,
      fragmentShader: this.fragmentShader,
      uniforms: {
        map: {
          value: loader.load(texture),
        },
        hueCoeff: {
          value: hueCoeff,
        },
      },
    }));

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

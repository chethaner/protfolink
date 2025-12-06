// Shared materials for 3D components
import * as THREE from 'three';

// Glass material with transparency
export const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0,
    roughness: 0.1,
    transmission: 0.9,
    transparent: true,
    opacity: 0.3,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
});

// Gradient material
export const createGradientMaterial = (color1 = '#667eea', color2 = '#764ba2') => {
    return new THREE.ShaderMaterial({
        uniforms: {
            color1: { value: new THREE.Color(color1) },
            color2: { value: new THREE.Color(color2) },
        },
        vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
        fragmentShader: `
      uniform vec3 color1;
      uniform vec3 color2;
      varying vec2 vUv;
      void main() {
        gl_FragColor = vec4(mix(color1, color2, vUv.y), 1.0);
      }
    `,
    });
};

// Holographic material
export const holographicMaterial = new THREE.ShaderMaterial({
    uniforms: {
        time: { value: 0 },
    },
    vertexShader: `
    varying vec2 vUv;
    varying vec3 vNormal;
    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    fragmentShader: `
    uniform float time;
    varying vec2 vUv;
    varying vec3 vNormal;
    void main() {
      float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
      vec3 rainbow = vec3(
        sin(vUv.y * 10.0 + time) * 0.5 + 0.5,
        sin(vUv.y * 10.0 + time + 2.0) * 0.5 + 0.5,
        sin(vUv.y * 10.0 + time + 4.0) * 0.5 + 0.5
      );
      gl_FragColor = vec4(rainbow * fresnel, 0.8);
    }
  `,
    transparent: true,
});

// Metallic material
export const createMetallicMaterial = (color = '#9333ea') => {
    return new THREE.MeshStandardMaterial({
        color: color,
        metalness: 0.9,
        roughness: 0.2,
        envMapIntensity: 1.0,
    });
};

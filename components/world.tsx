"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function World() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const width = ref.current.clientWidth;
    const height = ref.current.clientHeight;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 2;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    ref.current.appendChild(renderer.domElement);

    const textureLoader = new THREE.TextureLoader();

    textureLoader.load("/image.jpg", (texture) => {
      const uniforms = {
        uTexture: { value: texture },
        uTime: { value: 0 },
        uClick: { value: new THREE.Vector2(0.5, 0.5) },
        uProgress: { value: 0 }
      };

      const geometry = new THREE.PlaneGeometry(1.6, 1, 64, 64);

      const material = new THREE.ShaderMaterial({
        uniforms,

        vertexShader: `
        varying vec2 vUv;
        uniform float uTime;
        uniform vec2 uClick;
        uniform float uProgress;

        void main() {
          vUv = uv;

          vec3 pos = position;

          float dist = distance(uv, uClick);

          pos.z += sin(dist * 20.0 - uTime * 4.0) * 0.2 * uProgress;

          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.0);
        }
        `,

        fragmentShader: `
        uniform sampler2D uTexture;
        varying vec2 vUv;

        void main() {
          gl_FragColor = texture2D(uTexture, vUv);
        }
        `
      });

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();

      const handleClick = (event: MouseEvent) => {
        const rect = renderer.domElement.getBoundingClientRect();

        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObject(mesh);

        if (intersects.length > 0) {
          const uv = intersects[0].uv!;
          uniforms.uClick.value = uv;
          uniforms.uProgress.value = 1;
        }
      };

      renderer.domElement.addEventListener("click", handleClick);

      const animate = () => {
        requestAnimationFrame(animate);

        uniforms.uTime.value += 0.05;
        uniforms.uProgress.value *= 0.95;

        renderer.render(scene, camera);
      };

      animate();
    });

  }, []);

  return (
    <div
      ref={ref}
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden"
      }}
    />
  );
}
"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface WorldProps {
  img: string;
}

export default function World({ img }: WorldProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const width = ref.current.clientWidth;
    const height = ref.current.clientHeight;
    const screenAspect = width / height;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, screenAspect, 0.1, 10);
    camera.position.z = 1.5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    ref.current.appendChild(renderer.domElement);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const vertexShader = `
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
    `;

    const fragmentShader = `
      uniform sampler2D uTexture;
      varying vec2 vUv;

      void main() {
        gl_FragColor = texture2D(uTexture, vUv);
      }
    `;

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(img, (texture) => {
      const uniforms = {
        uTexture: { value: texture },
        uTime: { value: 0 },
        uClick: { value: new THREE.Vector2(0.5, 0.5) },
        uProgress: { value: 0 },
      };

      const material = new THREE.ShaderMaterial({
        uniforms,
        vertexShader,
        fragmentShader,
      });

      // Calculate plane size to cover screen while preserving image aspect
      const imgAspect = texture.image.width / texture.image.height;
      let planeWidth = 2;
      let planeHeight = 2;

      if (screenAspect > imgAspect) {
        // screen is wider → scale height
        planeHeight = 2;
        planeWidth = planeHeight * screenAspect / imgAspect;
      } else {
        // screen is taller → scale width
        planeWidth = 2;
        planeHeight = planeWidth * imgAspect / screenAspect;
      }

      const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight, 64, 64);
      const plane = new THREE.Mesh(geometry, material);
      plane.userData = { uniforms };
      scene.add(plane);

      const handleClick = (event: MouseEvent) => {
        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(plane);
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

      const handleResize = () => {
        const w = ref.current!.clientWidth;
        const h = ref.current!.clientHeight;
        const screenAspect = w / h;
        camera.aspect = screenAspect;
        camera.updateProjectionMatrix();

        // Adjust plane to new aspect
        if (screenAspect > imgAspect) {
          planeHeight = 2;
          planeWidth = planeHeight * screenAspect / imgAspect;
        } else {
          planeWidth = 2;
          planeHeight = planeWidth * imgAspect / screenAspect;
        }
        plane.scale.set(planeWidth / 2, planeHeight / 2, 1); // scale relative to initial geometry

        renderer.setSize(w, h);
      };
      window.addEventListener("resize", handleResize);

      return () => {
        renderer.domElement.removeEventListener("click", handleClick);
        window.removeEventListener("resize", handleResize);
        renderer.dispose();
      };
    });
  }, [img]);

  return (
    <div
      ref={ref}
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
      }}
    />
  );
}
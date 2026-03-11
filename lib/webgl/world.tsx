"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface Item {
  name: string;
  img: string;
}

interface WorldProps {
  items: Item[];
}

export default function World({ items }: WorldProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const width = ref.current.clientWidth;
    const height = ref.current.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    ref.current.appendChild(renderer.domElement);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const planes: THREE.Mesh[] = [];
    const textureLoader = new THREE.TextureLoader();

    // Vertex & Fragment shaders
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

    // Load all items as planes
    items.forEach((item, i) => {
      const texturePath = `/assets/item/${item.img}.webp`; // Correct path
      textureLoader.load(
        texturePath,
        (texture) => {
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

          const geometry = new THREE.PlaneGeometry(1.6, 1, 64, 64);
          const mesh = new THREE.Mesh(geometry, material);

          // Center planes horizontally
          mesh.position.x = i * 2 - ((items.length - 1) * 1);
          mesh.userData = { uniforms };

          scene.add(mesh);
          planes.push(mesh);
        },
        undefined,
        (err) => console.error("Failed to load texture:", texturePath, err)
      );
    });

    // Click ripple
    const handleClick = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(planes);

      intersects.forEach((intersect) => {
        const uniforms = (intersect.object as any).userData.uniforms;
        if (uniforms) {
          const uv = intersect.uv!;
          uniforms.uClick.value = uv;
          uniforms.uProgress.value = 1;
        }
      });
    };

    renderer.domElement.addEventListener("click", handleClick);

    // Animate
    const animate = () => {
      requestAnimationFrame(animate);
      planes.forEach((mesh) => {
        const uniforms = (mesh as any).userData.uniforms;
        if (uniforms) {
          uniforms.uTime.value += 0.05;
          uniforms.uProgress.value *= 0.95;
        }
      });
      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      const w = ref.current!.clientWidth;
      const h = ref.current!.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      renderer.domElement.removeEventListener("click", handleClick);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, [items]);

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
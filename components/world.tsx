'use client'

import { gsap } from "gsap";
import { useRef, useEffect } from "react";
import * as THREE from "three";

/* GLOBAL reference so other files can access it */
let distortionMaterial: THREE.ShaderMaterial | null = null;

export function triggerDistortion() {
  if (!distortionMaterial) return;

  gsap.fromTo(
    distortionMaterial.uniforms.uDistortion,
    { value: 0 },
    {
      value: 1,
      duration: 0.25,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    }
  );
}

export default function World() {

  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();

    const camera = new THREE.OrthographicCamera(
      -1, 1, 1, -1, 0.1, 10
    );

    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);

    mount.appendChild(renderer.domElement);

    const texture = new THREE.TextureLoader().load("/background.jpg");

    const material = new THREE.ShaderMaterial({

      uniforms: {
        uTime: { value: 0 },
        uTexture: { value: texture },
        uDistortion: { value: 0 }
      },

      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position,1.0);
        }
      `,

      fragmentShader: `
        uniform sampler2D uTexture;
        uniform float uTime;
        uniform float uDistortion;

        varying vec2 vUv;

        float random(vec2 st){
          return fract(sin(dot(st.xy,vec2(12.9898,78.233))) * 43758.5453123);
        }

        void main(){

          vec2 uv = vUv;

          uv.y += sin(uv.x * 10.0 + uTime) * 0.02 * uDistortion;

          vec4 color = texture2D(uTexture, uv);

          float noise = random(gl_FragCoord.xy + uTime) * 0.05 * uDistortion;

          color.rgb += noise;

          gl_FragColor = color;
        }
      `
    });

    /* Save material globally */
    distortionMaterial = material;

    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(2,2),
      material
    );

    scene.add(plane);

    const clock = new THREE.Clock();

    const animate = () => {

      material.uniforms.uTime.value = clock.getElapsedTime();

      renderer.render(scene, camera);

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {

      mount.removeChild(renderer.domElement);

      window.removeEventListener("resize", handleResize);
    };

  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: "fixed",
        top:0,
        left:0,
        width:"100%",
        height:"100%",
        zIndex:-1
      }}
    />
  );
}
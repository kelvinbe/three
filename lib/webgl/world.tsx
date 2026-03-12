'use client'

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { gsap } from "gsap"

let materialRef: THREE.ShaderMaterial | null = null

export function triggerDistortion() {

  if(!materialRef) return

  gsap.timeline()
    .to(materialRef.uniforms.uDistortion,{value:1,duration:.35,ease:"power2.out"})
    .to(materialRef.uniforms.uBlur,{value:1,duration:.25},0)
}

export function resetDistortion(){

  if(!materialRef) return

  gsap.to(materialRef.uniforms.uDistortion,{value:0,duration:.6,ease:"power3.out"})
  gsap.to(materialRef.uniforms.uBlur,{value:0,duration:.6,ease:"power3.out"})
}

export default function World({img}:{img:string}){

  const ref = useRef<HTMLDivElement>(null)

  useEffect(()=>{

    const scene = new THREE.Scene()

    const camera = new THREE.OrthographicCamera(-1,1,1,-1,0,10)
    camera.position.z = 1

    const renderer = new THREE.WebGLRenderer({antialias:true})
    renderer.setSize(window.innerWidth,window.innerHeight)

    ref.current?.appendChild(renderer.domElement)

    const loader = new THREE.TextureLoader()

    loader.load(img,(texture)=>{

      const uniforms = {
        uTexture:{value:texture},
        uTime:{value:0},
        uDistortion:{value:0},
        uBlur:{value:0}
      }

      const material = new THREE.ShaderMaterial({

        uniforms,

        vertexShader:`
        varying vec2 vUv;

        void main(){
          vUv = uv;
          gl_Position = vec4(position,1.0);
        }
        `,

        fragmentShader:`

        uniform sampler2D uTexture;
        uniform float uTime;
        uniform float uDistortion;
        uniform float uBlur;

        varying vec2 vUv;

        float rand(vec2 co){
          return fract(sin(dot(co.xy,vec2(12.9898,78.233))) * 43758.5453);
        }

        void main(){

          vec2 uv = vUv;

          float band = step(.75,rand(vec2(uv.y*20.,uTime)));

          uv.x += band*.2*uDistortion;

          uv.x += sin(uv.y*40.+uTime*5.)*.015*uDistortion;

          vec4 color = texture2D(uTexture,uv);

          float shift = .02*uDistortion;

          color.r = texture2D(uTexture,uv+vec2(shift,0)).r;
          color.b = texture2D(uTexture,uv-vec2(shift,0)).b;

          color.rgb = mix(color.rgb,vec3(dot(color.rgb,vec3(.33))),uBlur*.3);

          gl_FragColor = color;
        }
        `
      })

      materialRef = material

      const geometry = new THREE.PlaneGeometry(2,2)
      const mesh = new THREE.Mesh(geometry,material)

      scene.add(mesh)

      const clock = new THREE.Clock()

      const animate = ()=>{

        uniforms.uTime.value = clock.getElapsedTime()

        renderer.render(scene,camera)

        requestAnimationFrame(animate)
      }

      animate()

    })

  },[])

  return(
    <div
      ref={ref}
      style={{
        position:"fixed",
        inset:0,
        zIndex:-1
      }}
    />
  )
}
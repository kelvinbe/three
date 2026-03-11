// // components/Scene.tsx
// 'use client'

// import { useRef } from 'react'
// import { useFrame } from '@react-three/fiber'
// import { Sphere, MeshDistortMaterial } from '@react-three/drei'

// export default function Scene() {
//   const sphereRef = useRef()

//   useFrame(({ clock, mouse }) => {
//     if (sphereRef.current) {
//       // Rotate based on mouse position
//       sphereRef.current.rotation.x = mouse.y * 0.5
//       sphereRef.current.rotation.y = mouse.x * 0.5 + clock.getElapsedTime() * 0.1
//     }
//   })

//   return (
//     <>
//       <ambientLight intensity={0.5} />
//       <pointLight position={[10, 10, 10]} intensity={1} />
//       <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4f46e5" />
      
//       <Sphere ref={sphereRef} args={[2, 128, 128]} position={[0, 0, 0]}>
//         <MeshDistortMaterial
//           color="#ffffff"
//           emissive="#333333"
//           roughness={0.2}
//           metalness={0.8}
//           distort={0.4}
//           speed={2}
//         />
//       </Sphere>
//     </>
//   )
// }
// // components/LoadingScreen.tsx
// 'use client'

// import { useEffect, useState } from 'react'

// export default function LoadingScreen() {
//   const [progress, setProgress] = useState(0)

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setProgress((prev) => {
//         if (prev >= 100) {
//           clearInterval(interval)
//           return 100
//         }
//         return prev + 1
//       })
//     }, 30)

//     return () => clearInterval(interval)
//   }, [])

//   return (
//     <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center">
//       <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
//         <div 
//           className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
//           style={{ width: `${progress}%` }}
//         />
//       </div>
//       <p className="text-white mt-4 text-sm tracking-widest">
//         LOADING {progress}%
//       </p>
//     </div>
//   )
// }
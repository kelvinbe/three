// // components/Menu.tsx
// 'use client'

// import { useState } from 'react'
// import Link from 'next/link'

// interface MenuProps {
//   handMode: boolean
//   setHandMode: (value: boolean) => void
//   sound: boolean
//   setSound: (value: boolean) => void
// }

// export default function Menu({ handMode, setHandMode, sound, setSound }: MenuProps) {
//   const [isHovered, setIsHovered] = useState<string | null>(null)

//   const menuItems = [
//     { name: 'HOME', href: '/' },
//     { name: 'ABOUT', href: '/about' },
//     { name: 'WORKS', href: '/works' },
//     { name: 'ARTWORK', href: '/artwork' },
//   ]

//   const languageItems = [
//     { name: 'How to Use Hand Mode (JA)', href: '/hand-mode-ja' },
//     { name: 'How to Use Hand Mode (EN)', href: '/hand-mode-en' },
//   ]

//   return (
//     <>
//       {/* Left Menu - Main Navigation */}
//       <div className="absolute top-12 left-12 z-20 space-y-3">
//         {menuItems.map((item) => (
//           <div key={item.name} className="relative">
//             <Link
//               href={item.href}
//               className="block text-white/70 hover:text-white transition-colors duration-300 text-sm tracking-widest"
//               onMouseEnter={() => setIsHovered(item.name)}
//               onMouseLeave={() => setIsHovered(null)}
//             >
//               {item.name}
//             </Link>
//             {/* Hover line effect */}
//             <span 
//               className={`absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 ${
//                 isHovered === item.name ? 'w-full' : 'w-0'
//               }`}
//             />
//           </div>
//         ))}
//       </div>

//       {/* Right Menu - Controls and Language */}
//       <div className="absolute top-12 right-12 z-20 text-right space-y-6">
//         {/* Language Links */}
//         <div className="space-y-3">
//           {languageItems.map((item) => (
//             <div key={item.name} className="relative">
//               <Link
//                 href={item.href}
//                 className="block text-white/50 hover:text-white transition-colors duration-300 text-xs tracking-wider"
//                 onMouseEnter={() => setIsHovered(item.name)}
//                 onMouseLeave={() => setIsHovered(null)}
//               >
//                 {item.name}
//               </Link>
//               <span 
//                 className={`absolute bottom-0 right-0 h-px bg-white transition-all duration-300 ${
//                   isHovered === item.name ? 'w-full' : 'w-0'
//                 }`}
//               />
//             </div>
//           ))}
//         </div>

//         {/* Toggle Switches */}
//         <div className="space-y-4 pt-4">
//           {/* Hand Mode Toggle */}
//           <button
//             onClick={() => setHandMode(!handMode)}
//             className="flex items-center justify-end gap-4 group"
//           >
//             <span className="text-white/50 group-hover:text-white transition-colors text-xs tracking-wider">
//               Hand:{handMode ? 'On' : 'Off'}
//             </span>
//             <div className={`w-8 h-4 rounded-full transition-colors duration-300 ${
//               handMode ? 'bg-white' : 'bg-white/20'
//             }`}>
//               <div className={`w-4 h-4 rounded-full bg-black transform transition-transform duration-300 ${
//                 handMode ? 'translate-x-4' : 'translate-x-0'
//               }`} />
//             </div>
//           </button>

//           {/* Sound Toggle */}
//           <button
//             onClick={() => setSound(!sound)}
//             className="flex items-center justify-end gap-4 group"
//           >
//             <span className="text-white/50 group-hover:text-white transition-colors text-xs tracking-wider">
//               Sound:{sound ? 'On' : 'Off'}
//             </span>
//             <div className={`w-8 h-4 rounded-full transition-colors duration-300 ${
//               sound ? 'bg-white' : 'bg-white/20'
//             }`}>
//               <div className={`w-4 h-4 rounded-full bg-black transform transition-transform duration-300 ${
//                 sound ? 'translate-x-4' : 'translate-x-0'
//               }`} />
//             </div>
//           </button>
//         </div>
//       </div>

//       {/* Bottom Left - Additional Info (if needed) */}
//       <div className="absolute bottom-12 left-12 z-20">
//         <p className="text-white/30 text-xs tracking-wider">
//           © 2024
//         </p>
//       </div>
//     </>
//   )
// }
// // components/Navigation.tsx
// 'use client'

// import { useState, useEffect } from 'react'
// import Link from 'next/link'

// export default function Navigation() {
//   const [isOpen, setIsOpen] = useState(false)
//   const [scrolled, setScrolled] = useState(false)

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 50)
//     }
//     window.addEventListener('scroll', handleScroll)
//     return () => window.removeEventListener('scroll', handleScroll)
//   }, [])

//   const menuItems = [
//     { name: 'WORK', href: '/work' },
//     { name: 'ABOUT', href: '/about' },
//     { name: 'CONTACT', href: '/contact' },
//   ]

//   return (
//     <>
//       {/* Navigation Bar */}
//       <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//         scrolled ? 'bg-black/80 backdrop-blur-md py-4' : 'bg-transparent py-6'
//       }`}>
//         <div className="container mx-auto px-6 flex justify-between items-center">
//           {/* Logo */}
//           <Link href="/" className="text-white text-xl font-bold tracking-wider">
//             S.K
//           </Link>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex space-x-12">
//             {menuItems.map((item) => (
//               <Link
//                 key={item.name}
//                 href={item.href}
//                 className="text-white/80 hover:text-white transition-colors tracking-widest text-sm"
//               >
//                 {item.name}
//               </Link>
//             ))}
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="md:hidden text-white focus:outline-none"
//           >
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               {isOpen ? (
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               ) : (
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//               )}
//             </svg>
//           </button>
//         </div>
//       </nav>

//       {/* Mobile Menu */}
//       <div className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-lg transition-transform duration-300 transform ${
//         isOpen ? 'translate-x-0' : 'translate-x-full'
//       } md:hidden`}>
//         <div className="flex flex-col items-center justify-center h-full space-y-8">
//           {menuItems.map((item) => (
//             <Link
//               key={item.name}
//               href={item.href}
//               onClick={() => setIsOpen(false)}
//               className="text-white text-2xl tracking-widest hover:text-purple-400 transition-colors"
//             >
//               {item.name}
//             </Link>
//           ))}
//         </div>
//       </div>
//     </>
//   )
// }
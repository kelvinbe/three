'use client'

import { useEffect } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({ children }) {

  useEffect(() => {

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true
    });

    // sync Lenis with ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

  }, []);

  return children;
}
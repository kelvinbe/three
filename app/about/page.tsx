'use client'

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Menu from "@/components/Menu";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const refs = useRef<HTMLElement[]>([]);

  const addToRefs = (el: HTMLElement) => {
    if (el && !refs.current.includes(el)) {
      refs.current.push(el);
    }
  };

  const sections = [
    {
      number: "01",
      title: "ABOUT ME",
      paragraphs: [
        `Hello, world.
I’m Kelvin Beno, a web developer and mobile developer in Nairobi.

Born in and raised in Aichi, Japan,
I’ve been working in web production since 2021.

Inspired by digital experiences that move and respond,
I create interactive works and visuals using tools like WebGL and Blender.

Outside of work, I enjoy anime, manga, films, and games.
Umbreon from Pokémon is my favorite character.`
      ]
    },
    {
      number: "02",
      title: "WHAT I DO",
      paragraphs: [
        `I primarily work on website development,
including corporate, recruitment, and campaign sites.

I collaborate with clients, designers, and teams
to translate ideas and design intent into implementation.

Recently, I’ve been building sites with Astro and custom WordPress themes,
occasionally incorporating WebGL when needed.

I also work on interactive content, CG-based visuals,
animations, and assets for Unity.`
      ]
    },
    {
      number: "03",
      title: "WORK PHILOSOPHY",
      paragraphs: [
        `I design and develop interactive web experiences.
My focus is WebGL, Three.js and immersive interfaces.
I combine motion, design and code to create digital stories.`
      ]
    },
    {
      number: "04",
      title: "LINKS",
      paragraphs: [
        `I design and develop interactive web experiences.
My focus is WebGL, Three.js and immersive interfaces.
My aim is to combine motion, design, and code to create digital stories.`
      ]
    },
  ];

  useEffect(() => {
    refs.current.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%"
          }
        }
      );
    });
  }, []);

  return (
    <div
      style={{
        minHeight: "400vh",
        color: "white",
        position: "relative",
        // padding: "0 20px"
      }}
    >
      <Menu />

      {sections.map((section, sectionIndex) => (
        <div
          key={sectionIndex}
          style={{
            display: "flex",
            flexWrap: "nowrap", // Keep label next to text
            gap: "60px",
            maxWidth: "1100px",
            margin: "0 auto",
            paddingTop: "120px",
            alignItems: "flex-start",
          }}
        >
          {/* LEFT SECTION LABEL */}
          <h2
            style={{
              minWidth: "180px",
              fontWeight: "300",
              letterSpacing: "4px",
              position: "sticky",
              top: "20px",
              height: "fit-content",
              fontSize: "14px",
              flexShrink: 0, // prevent shrinking
            }}
          >
            [ {section.number} {section.title} ]
          </h2>

          {/* RIGHT TEXT */}
          <div
            style={{
              flex: "1 1 0", // take remaining space
              fontSize: "16px",
              lineHeight: "1.8",
              letterSpacing: "1px",
            }}
          >
            {section.paragraphs.map((text, i) => (
              <p
                key={i}
                ref={addToRefs}
                style={{
                  marginBottom: "80px",
                  fontSize: "16px"
                }}
              >
                {text}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

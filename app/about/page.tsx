'use client'

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Menu from "@/components/Menu"

gsap.registerPlugin(ScrollTrigger)

export default function About() {

  const refs = useRef<HTMLElement[]>([])

  const addToRefs = (el: HTMLElement) => {
    if (el && !refs.current.includes(el)) {
      refs.current.push(el)
    }
  }

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
    }
  ]

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
      )

    })

  }, [])

  return (

    <div className="aboutPage">

      <Menu />

      {sections.map((section, sectionIndex) => (

        <div key={sectionIndex} className="aboutSection">

          {/* LEFT LABEL */}

          <h2 className="aboutLabel">
            [ {section.number} {section.title} ]
          </h2>

          {/* RIGHT TEXT */}

          <div className="aboutText">

            {section.paragraphs.map((text, i) => (

              <p
                key={i}
                ref={addToRefs}
              >
                {text}
              </p>

            ))}

          </div>

        </div>

      ))}

      <style jsx>{`

        .aboutPage{
          min-height:100vh;
          color:white;
          position:relative;
          padding:0 24px;
        }

        .aboutSection{
          display:flex;
          gap:60px;
          max-width:1100px;
          margin:0 auto;
          padding-top:120px;
          align-items:flex-start;
        }

        .aboutLabel{
          min-width:180px;
          font-weight:300;
          letter-spacing:4px;
          position:sticky;
          top:20px;
          height:fit-content;
          font-size:14px;
          flex-shrink:0;
        }

        .aboutText{
          flex:1;
          font-size:16px;
          line-height:1.8;
          letter-spacing:1px;
        }

        .aboutText p{
          margin-bottom:80px;
        }

        /* TABLET */

        @media (max-width:1024px){

          .aboutSection{
            gap:40px;
          }

        }

        /* MOBILE */

        @media (max-width:768px){

          .aboutSection{
            flex-direction:column;
            gap:20px;
            padding-top:100px;
          }

          .aboutLabel{
            position:relative;
            top:auto;
            min-width:auto;
            font-size:13px;
          }

          .aboutText{
            font-size:15px;
          }

          .aboutText p{
            margin-bottom:50px;
          }

        }

        /* SMALL PHONES */

        @media (max-width:480px){

          .aboutText{
            font-size:14px;
            line-height:1.7;
          }

          .aboutText p{
            margin-bottom:40px;
          }

        }

      `}</style>

    </div>

  )

}
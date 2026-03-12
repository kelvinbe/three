'use client'

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Menu from "@/components/Menu";
import Link from "next/link";
import { view } from "framer-motion/client";

gsap.registerPlugin(ScrollTrigger);

export default function Works() {

  const refs = useRef<HTMLDivElement[]>([]);

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !refs.current.includes(el)) {
      refs.current.push(el);
    }
  };

  const works = [
    {
      title: "TERMINAL MANAGEMENT SYSTEM",
      year: "2024",
      role: "Software Developer",
      image: "/kaya.png",
      link: "https://terminalms.netlify.app/",
      view: "Desktop View Only"
    },
    {
      title: "CARD MANAGEMENT SYSTEM",
      year: "2025",
      role: "Software Developer",
      image: "/card.png",
      link: "https://cmssnairobi.netlify.app/",
      view: "Desktop View Only"
    },
    {
      title: "MEMO SOME",
      year: "2026",
      role: "Software Developer",
      image: "/memo.png",
      link: "https://www.memosome.com/",
      view: "Desktop and Mobile View Only"
    }
  ];

  useEffect(() => {

    refs.current.forEach((el) => {

      gsap.fromTo(
        el,
        {
          opacity: 0,
          y: 120,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          }
        }
      );

    });

  }, []);

  return (
    <div className="container">

      <Menu />

      <h1
        style={{
          fontSize: "32px",
          fontWeight: "300",
          margin: "60px auto",
          maxWidth: "1100px",
          textAlign: "center"
        }}
      >
        My Works
      </h1>

      <div className="worksWrapper">

        {works.map((work, i) => (

          <Link key={i} href={work.link} className="workLink">

            <div ref={addToRefs} className="workItem">

              <div className="workCard">
                <img src={work.image} className="workImage" />
              </div>

              <div className="workInfo">

                <h2>{work.title}</h2>

                <div className="meta">
                  <span>{work.year}</span>
                  <span>{work.role}</span>
                  <span>{work.view}</span>
                </div>

              </div>

            </div>

          </Link>

        ))}

      </div>

      <style jsx>{`

        .container{
          min-height:200vh;
          padding-left:120px;
          padding-right:40px;
          padding-top:120px;
          color:white;
        }

        .worksWrapper{
          max-width:1000px;
          margin:0 auto;
          display:flex;
          flex-direction:column;
          gap:120px;
        }

        .workLink{
          text-decoration:none;
          color:white;
        }

        .workItem{
          display:flex;
          flex-direction:column;
          gap:20px;
        }

        .workCard{
          position:relative;
          height:420px;
          border-radius:20px;
          overflow:hidden;
          cursor:pointer;
          background:#000;

          transition:transform .6s ease;

          box-shadow:
          0 0 0 1px rgba(255,255,255,.1),
          0 0 25px rgba(180,200,255,.25),
          inset 0 0 40px rgba(255,255,255,.05);
        }

        .workCard:hover{
          transform:scale(1.02);
        }

        .workImage{
          width:100%;
          height:100%;
          object-fit:cover;
          filter:brightness(.85);
        }

        .workInfo{
          text-align:center;
          color: white;
          text-decoration:underline;
        }

        .workInfo h2{
          font-size:32px;
          letter-spacing:.2em;
          font-weight:300;
        }

        .meta{
          display:flex;
          justify-content:center;
          gap:20px;
          font-size:12px;
          letter-spacing:.2em;
          opacity:.8;
          text-decoration:underline;
        }

        /* MOBILE */

        @media(max-width:900px){

          .container{
            padding-left:40px;
          }

          .workCard{
            height:320px;
          }

          .workInfo h2{
            font-size:22px;
          }

        }

      `}</style>

    </div>
  );
}
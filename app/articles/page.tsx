'use client'

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Menu from "@/components/Menu";
import Link from "next/link";

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
      title: "Interactive Museum",
      image: "/works/project-a.jpg",
      link: "/works/project-a"
    },
    {
      title: "Creative Portfolio",
      image: "/works/project-b.jpg",
      link: "/works/project-b"
    },
    {
      title: "WebGL Experiments",
      image: "/works/project-c.jpg",
      link: "/works/project-c"
    },
    {
      title: "Digital Campaign",
      image: "/works/project-d.jpg",
      link: "/works/project-d"
    }
  ];

  useEffect(() => {

    refs.current.forEach((el) => {

      gsap.fromTo(
        el,
        { opacity: 0, y: 80, rotate: -3 },
        {
          opacity: 1,
          y: 0,
          rotate: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%"
          }
        }
      );

    });

  }, []);

  return (

    <div className="container">

      <Menu />

      <div className="row">

        {works.map((work, i) => (

          <Link key={i} href={work.link} className="link">

            <div ref={addToRefs} className="paper">

              <div className="fold"></div>

              <img src={work.image} className="thumb"/>

              <h3>{work.title}</h3>

              <div className="lines">
                <span/>
                <span/>
                <span/>
              </div>

            </div>

          </Link>

        ))}

      </div>

      <style jsx>{`

        .container{
          min-height:150vh;
          padding:120px 40px;
          color:#111;
        }

        .row{
          display:flex;
          gap:40px;
          justify-content:center;
          flex-wrap:wrap;
        }

        .link{
          text-decoration:none;
          color:inherit;
        }

        .paper{

          width:220px;
          height:260px;

          background:#fffdf8;

          border:1px solid #ddd;

          box-shadow:
          0 10px 20px rgba(0,0,0,.1);

          padding:18px;

          position:relative;

          display:flex;
          flex-direction:column;
          gap:12px;

          font-family:Georgia, serif;

          transition:transform .4s ease;
        }

        .paper:hover{
          transform:translateY(-10px) rotate(1deg);
        }

        .fold{

          position:absolute;
          top:0;
          right:0;

          width:0;
          height:0;

          border-top:40px solid #eee;
          border-left:40px solid transparent;
        }

        .thumb{

          width:100%;
          height:100px;
          object-fit:cover;

          filter:grayscale(80%);
        }

        h3{
          font-size:16px;
          margin:0;
          line-height:1.4;
        }

        .lines{
          display:flex;
          flex-direction:column;
          gap:6px;
        }

        .lines span{
          height:3px;
          background:#bbb;
          width:100%;
        }

        .lines span:nth-child(2){
          width:85%;
        }

        .lines span:nth-child(3){
          width:65%;
        }

      `}</style>

    </div>

  );

}
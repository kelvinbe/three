'use client'

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Menu from "@/components/Menu";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function Articles() {
  const refs = useRef<HTMLDivElement[]>([]);

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !refs.current.includes(el)) {
      refs.current.push(el);
    }
  };

  const works = [
    {
      title: "Project A",
      description: "Corporate website built with Next.js and Tailwind CSS.",
      image: "/works/project-a.jpg",
      link: "/works/project-a"
    },
    {
      title: "Project B",
      description: "Interactive WebGL portfolio showcasing 3D models.",
      image: "/works/project-b.jpg",
      link: "/works/project-b"
    },
    {
      title: "Project C",
      description: "Campaign landing page with animations and GSAP scroll effects.",
      image: "/works/project-c.jpg",
      link: "/works/project-c"
    },
    {
      title: "Project D",
      description: "Custom WordPress theme with dynamic content management.",
      image: "/works/project-d.jpg",
      link: "/works/project-d"
    }
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
        minHeight: "200vh",
        color: "white",
        position: "relative",
        padding: "0 20px"
      }}
    >
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

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "60px",
          maxWidth: "800px",
          margin: "0 auto",
          paddingBottom: "100px"
        }}
      >
        {works.map((work, i) => (
          <Link
            key={i}
            href={work.link}
            style={{
              textDecoration: "none",
              color: "inherit"
            }}
          >
            <div
              ref={addToRefs}
              style={{
                display: "flex",
                gap: "20px",
                background: "#111",
                borderRadius: "12px",
                overflow: "hidden",
                cursor: "pointer",
                flexDirection: "row",
                alignItems: "flex-start",
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-5px)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 10px 20px rgba(0,0,0,0.5)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
              }}
            >
              <img
                src={work.image}
                alt={work.title}
                style={{ width: "180px", height: "120px", objectFit: "cover", flexShrink: 0 }}
              />
              <div style={{ padding: "20px" }}>
                <h3 style={{ margin: "0 0 10px 0", fontWeight: "400", fontSize: "18px" }}>
                  {work.title}
                </h3>
                <p style={{ margin: 0, fontSize: "14px", lineHeight: "1.6" }}>
                  {work.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

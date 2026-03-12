'use client'

import { triggerDistortion, resetDistortion } from "../lib/webgl/world";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Menu() {

  const router = useRouter();

  const menu = ["HOME", "ABOUT", "WORKS", "ARTICLES"];

  const getHref = (item:string) => {
    if(item === "HOME") return "/";
    if(item === "ABOUT") return "/about";
    if(item === "WORKS") return "/work";
    if(item === "ARTICLES") return "/articles";
  };

  const pathname = usePathname();

useEffect(() => {
  resetDistortion();
}, [pathname]);

const handleClick = (href:string) => {

  triggerDistortion();

  setTimeout(()=>{
    router.push(href);
  },350);

  // reset AFTER page loads
  setTimeout(()=>{
    resetDistortion();
  },700);

};

  return (
    <div className="menu">

      <style jsx>{`
        .menu {
          position: fixed;
          top: 27%;
          left: 90px;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 28px;
          color: #cfcfcf;
          z-index: 10;
        }

        .menuItem {
          font-size: 14px;
          letter-spacing: 3px;
          border-bottom: 1px solid rgba(255,255,255,0.35);
          padding-bottom: 6px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .menuItem:hover {
          color: white;
          border-bottom: 1px solid white;
        }

        @media (max-width: 768px) {
          .menu {
            top: 30px;
            left: 50%;
            transform: translateX(-50%);
            flex-direction: row;
            gap: 20px;
          }

          .menuItem {
            font-size: 12px;
            letter-spacing: 2px;
          }
        }
      `}</style>

      {menu.map((item) => {

        const href = getHref(item);

        return (
          <div
            key={item}
            className="menuItem"
            onClick={() => handleClick(href)}
          >
            {item}
          </div>
        )

      })}

    </div>
  );
}
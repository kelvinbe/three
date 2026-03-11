'use client'
import Link from "next/link";

export default function Menu() {

  const menu = ["HOME", "ABOUT", "WORKS", "ARTWORK"];

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

      {menu.map((item) => (
        <Link
          key={item}
          href={
            item === "HOME"
              ? "/"
              : item === "ABOUT"
              ? "/about"
              : item === "WORKS"
              ? "/work"
              : "/artwork"
          }
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div className="menuItem">{item}</div>
        </Link>
      ))}

    </div>
  );
}
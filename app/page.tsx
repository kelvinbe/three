'use client'
import World from "@/lib/webgl/world";

export default function Home() {
  const hello = [
    { char: "H", mirrored: false },
    { char: "E", mirrored: true },
    { char: "L", mirrored: true },
    { char: "L", mirrored: true },
    { char: "O", mirrored: false },
  ];

  const menu = ["HOME", "ABOUT", "WORKS", "ARTWORK"];

  const neonStyle = {
    color: "#e6ffff",
    fontWeight: 200,
    textShadow: `
      0 0 2px #b1f7f7,
      0 0 4px #ffffff,
      0 0 8px #424242,
      0 0 16px #ffffff,
      0 0 32px #b3b6b6
    `,
    animation: "brokenFlicker 3s infinite",
  };

  return (
    <div className="container">
      <style jsx global>{`
        body {
          margin: 0;
        }

        @keyframes brokenFlicker {
          0% { opacity: 1; }
          4% { opacity: 0.4; }
          6% { opacity: 1; }
          7% { opacity: 0.2; }
          9% { opacity: 1; }
          12% { opacity: 0.6; }
          13% { opacity: 1; }
          20% { opacity: 1; }
          21% { opacity: 0.1; }
          22% { opacity: 1; }
          60% { opacity: 1; }
          61% { opacity: 0.3; }
          63% { opacity: 1; }
          80% { opacity: 1; }
          81% { opacity: 0.2; }
          83% { opacity: 1; }
          100% { opacity: 1; }
        }

        .container {
          position: relative;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          font-family: Arial, Helvetica, sans-serif;
        }

        .menu {
          position: absolute;
          top: 20%;
          left: 90px;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 28px;
          color: #cfcfcf;
        }

        .menuItem {
          font-size: 14px;
          letter-spacing: 3px;
          border-bottom: 1px solid rgba(255,255,255,0.35);
          padding-bottom: 6px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .centerText {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          align-items: center;
          gap: 14px;
          font-size: 4vw;
          letter-spacing: 2vw;
        }

        .subText {
          position: absolute;
          top: 58%;
          left: 50%;
          transform: translate(-50%, -0%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          font-size: 1.5vw;
          letter-spacing: 0.8vw;
        }

        /* MOBILE */
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

          .centerText {
            font-size: 10vw;
            letter-spacing: 4vw;
          }

          .subText {
            font-size: 4vw;
            letter-spacing: 2vw;
            top: 62%;
          }
        }
      `}</style>

      {/* WebGL background */}
      <World img="/main.jpg" />

      {/* Menu */}
      <div className="menu">
        {menu.map((item) => (
          <div key={item} className="menuItem">
            {item}
          </div>
        ))}
      </div>

      {/* HELLO WORLD */}
      <div className="centerText">
        {hello.map((letter, i) => (
          <span
            key={i}
            style={{
              display: "inline-block",
              transform: letter.mirrored ? "scaleX(-1)" : "none",
              ...neonStyle,
            }}
          >
            {letter.char}
          </span>
        ))}

        <span style={{ marginLeft: "2vw", ...neonStyle }}>
          WORLD
        </span>
      </div>

      {/* Name + Japanese */}
      <div className="subText">
        <div>KELVIN BENO</div>

        <span>
          デベロッパー
        </span>
      </div>

    </div>
  );
}


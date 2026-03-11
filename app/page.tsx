'use client'
import Menu from "@/components/Menu";
import World from "@/lib/webgl/world";

export default function Home() {

  const hello = [
    { char: "H", mirrored: false },
    { char: "E", mirrored: true },
    { char: "L", mirrored: true },
    { char: "L", mirrored: true },
    { char: "O", mirrored: false },
  ];

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
          overflow-x: hidden;
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
          min-height: 600px;
          font-family: Arial, Helvetica, sans-serif;
        }

        /* CENTER HELLO TEXT */

        .centerText {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          align-items: center;
          gap: 14px;
          font-size: clamp(48px, 4vw, 90px);
          letter-spacing: clamp(10px, 2vw, 40px);
          text-align: center;
        }

        .subText {
          position: absolute;
          top: 60%;
          left: 50%;
          transform: translate(-50%, 0%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          letter-spacing: 0.5em;
          text-align: center;
        }

        /* TABLET */

        @media (max-width: 1024px) {

          .centerText {
            font-size: clamp(40px, 6vw, 70px);
            letter-spacing: clamp(8px, 3vw, 28px);
          }

          .subText {
            top: 62%;
            font-size: 13px;
          }

        }

        /* MOBILE */

        @media (max-width: 768px) {

          .centerText {
            flex-wrap: wrap;
            justify-content: center;
            font-size: clamp(36px, 10vw, 60px);
            letter-spacing: clamp(6px, 4vw, 20px);
            gap: 10px;
          }

          .subText {
            top: 65%;
            font-size: 12px;
            letter-spacing: 0.3em;
          }

        }

        /* SMALL PHONES */

        @media (max-width: 480px) {

          .centerText {
            font-size: clamp(28px, 12vw, 48px);
            letter-spacing: clamp(4px, 5vw, 16px);
          }

          .subText {
            top: 67%;
            font-size: 11px;
          }

        }

      `}</style>

      {/* WebGL Background */}
      <World img="/main.jpg" />

      {/* Menu */}
      <Menu />

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

      {/* SUBTEXT */}
      <div className="subText">
        <div>KELVIN BENO</div>
        <span>デベロッパー</span>
      </div>

    </div>
  );
}
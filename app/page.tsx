
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

  const menuStyle = {
    fontSize: "14px",
    letterSpacing: "3px",
    borderBottom: "1px solid rgba(255,255,255,0.35)",
    paddingBottom: "6px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  };

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
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      {/* Flickering neon animation */}
      <style jsx global>{`
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
      `}</style>

      {/* WebGL background */}
      <World img="/main.jpg" />

      {/* Left vertical menu */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "90px",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "28px",
          color: "#cfcfcf",
        }}
      >
        {menu.map((item) => (
          <div key={item} style={menuStyle}>
            {item}
          </div>
        ))}
      </div>

      {/* Center neon text */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          alignItems: "center",
          gap: "14px",
          fontSize: "48px",
          letterSpacing: "50px",
        }}
      >
        {hello.map((letter, i) => (
          <span
            key={i}
            style={{
              display: "inline-block",
              transform: letter.mirrored ? "scaleX(-1)" : "none",
              paddingBottom: "6px",
              animationDelay: `${i * 0.4}s`,
              ...neonStyle,
            }}
          >
            {letter.char}
          </span>
        ))}

        <span
          style={{
            marginLeft: "24px",
            paddingBottom: "6px",
            animationDelay: "2s",
            ...neonStyle,
          }}
        >
          WORLD
        </span>
      </div>
    </div>
  );
}


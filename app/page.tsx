
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

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        fontFamily: "sans-serif",
      }}
    >
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
          <div
            key={item}
            style={menuStyle}
            // onMouseEnter={(e) => {
            //   e.currentTarget.style.color = "#fff";
            //   e.currentTarget.style.borderBottom =
            //     "1px solid rgba(255,255,255,0.9)";
            // }}
            // onMouseLeave={(e) => {
            //   e.currentTarget.style.color = "#cfcfcf";
            //   e.currentTarget.style.borderBottom =
            //     "1px solid rgba(255,255,255,0.35)";
            // }}
          >
            {item}
          </div>
        ))}
      </div>

      {/* Center text */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          alignItems: "center",
          gap: "14px",
          color: "#cfcfcf",
          fontSize: "48px",
          letterSpacing: "6px",
        }}
      >
        {hello.map((letter, i) => (
          <span
            key={i}
            style={{
              display: "inline-block",
              transform: letter.mirrored ? "scaleX(-1)" : "none",
              paddingBottom: "6px",
            }}
          >
            {letter.char}
          </span>
        ))}

        <span
          style={{
            marginLeft: "24px",
            paddingBottom: "6px",
          }}
        >
          WORLD
        </span>
      </div>
    </div>
  );
}


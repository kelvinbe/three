import World from "@/lib/webgl/world";

export default function Home() {
  const hello = [
    { char: "H", mirrored: false },
    { char: "E", mirrored: true },
    { char: "L", mirrored: true },
    { char: "L", mirrored: true },
    { char: "O", mirrored: false },
  ];

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      {/* WebGL background */}
      <World img="/main.jpg" />

      {/* Menu on the left, vertical center */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "20px",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          color: "#fff",
          fontFamily: "sans-serif",
          fontSize: "18px",
        }}
      >
        <div>Home</div>
        <div>About</div>
        <div>Works</div>
      </div>

      {/* Centered text */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "10px",
          fontFamily: "sans-serif",
          color: "#fff",
          fontSize: "64px",
          fontWeight: "bold",
        }}
      >
        {/* HELLO with only ELL mirrored */}
        {hello.map((letter, i) => (
          <span
            key={i}
            style={{
              display: "inline-block",
              transform: letter.mirrored ? "scaleX(-1)" : "none",
            }}
          >
            {letter.char}
          </span>
        ))}

        {/* SPACE + WORLD */}
        <span style={{ marginLeft: "20px" }}>WORLD</span>
      </div>
    </div>
  );
}
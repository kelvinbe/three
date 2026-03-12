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

  const world = ["W","O","R","L","D"]

  const neonStyle = {
    color: "#e6ffff",
    fontWeight: 100,
    textShadow: `
      0 0 2px #b1f7f7,
      0 0 6px rgba(255,255,255,.4),
      0 0 14px rgba(255,255,255,.2)
    `,
    animation: "brokenFlicker 3s infinite",
  };

  return (
    <div className="container">

      <style jsx global>{`

        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300&display=swap');

        body{
          margin:0;
          overflow-x:hidden;
          font-family:'Inter',sans-serif;
        }

        @keyframes brokenFlicker{
          0%{opacity:1}
          4%{opacity:.4}
          6%{opacity:1}
          7%{opacity:.2}
          9%{opacity:1}
          12%{opacity:.6}
          13%{opacity:1}
          20%{opacity:1}
          21%{opacity:.1}
          22%{opacity:1}
          60%{opacity:1}
          61%{opacity:.3}
          63%{opacity:1}
          80%{opacity:1}
          81%{opacity:.2}
          83%{opacity:1}
          100%{opacity:1}
        }

        .container{
          position:relative;
          width:100vw;
          height:100vh;
          min-height:600px;
        }

        /* HERO TEXT */

        .centerText{
          position:absolute;
          top:50%;
          left:50%;
          transform:translate(-50%,-50%);
          display:flex;
          align-items:center;
          justify-content:center;
          gap:120px;
          font-size:clamp(50px,5vw,110px);
          font-weight:100;
        }

        .helloGroup,
        .worldGroup{
          display:flex;
          gap:32px;
        }

        .subText{
          position:absolute;
          top:60%;
          left:50%;
          transform:translate(-50%,0%);
          display:flex;
          flex-direction:column;
          align-items:center;
          gap:10px;
          font-size:14px;
          letter-spacing:.4em;
          font-weight:200;
          width: 200px;
          height: 90px
          background-color: black;
        }

        /* TABLET */

        @media (max-width:1024px){

          .centerText{
            font-size:clamp(40px,7vw,80px);
            gap:70px;
          }

          .helloGroup,
          .worldGroup{
            gap:20px;
          }

        }

        /* MOBILE */

        @media (max-width:768px){

          .centerText{
            flex-direction:column;
            gap:25px;
            font-size:clamp(30px,10vw,60px);
          }

          .helloGroup,
          .worldGroup{
            gap:12px;
          }

          .subText{
            top:65%;
            font-size:12px;
            letter-spacing:.25em;
          }

        }

        /* SMALL PHONES */

        @media (max-width:480px){

          .centerText{
            font-size:clamp(24px,13vw,42px);
          }

          .helloGroup,
          .worldGroup{
            gap:8px;
          }

          .subText{
            font-size:11px;
          }

        }

      `}</style>

      <Menu />

      <div className="centerText">

        {/* HELLO */}
        <div className="helloGroup">
          {hello.map((letter, i) => (
            <span
              key={i}
              style={{
                display:"inline-block",
                transform: letter.mirrored ? "scaleX(-1)" : "none",
                ...neonStyle
              }}
            >
              {letter.char}
            </span>
          ))}
        </div>

        {/* WORLD */}
        <div className="worldGroup">
          {world.map((letter, i) => (
            <span key={i} style={neonStyle}>
              {letter}
            </span>
          ))}
        </div>

      </div>

      <div className="subText">
        <div className="bg-black w-[200px] h-[90px]">KELVIN BENO</div>
        <span>デベロッパー</span>
      </div>

    </div>
  );
}
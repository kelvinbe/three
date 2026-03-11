
import type { Metadata } from "next";
import World from "@/lib/webgl/world";
import "./globals.css";
import SmoothScroll from "@/components/smoothScroll";


export const metadata: Metadata = {
  title: "Kelvin Beno",
  description: "Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>

        {/* WebGL Background */}
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none"
          }}
        >
          <World img="/main.jpg" />
        </div>

        {/* Smooth Scroll Wrapper */}
        <SmoothScroll>

          <div
            style={{
              position: "relative",
              zIndex: 1
            }}
          >
            {children}
          </div>

        </SmoothScroll>

      </body>
    </html>
  );
}


"use client";

import initFireflies from "./canvas";
import { useEffect, useRef } from "react";
import { CountdownTimer } from "./countdown";

export default function Home() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Ensure the canvas is available
    if (canvasRef.current) {
      initFireflies(); // Initialize the fireflies animation
    }
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <main className="relative text-white text-7xl">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <CountdownTimer />
      </div>
      <canvas
        id="fireflies-canvas"
        ref={canvasRef}
        style={{ width: "100vw", height: "100vh" }}
      ></canvas>
    </main>
  );
}

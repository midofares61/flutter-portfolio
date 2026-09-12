"use client";

import { useEffect, useRef } from "react";
import "./CursorGlow.css";

const CursorGlow = () => {
  const glowRef = useRef(null);
  const trailRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const trailPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    let animId;
    const animateTrail = () => {
      trailPos.current.x += (pos.current.x - trailPos.current.x) * 0.08;
      trailPos.current.y += (pos.current.y - trailPos.current.y) * 0.08;
      if (trailRef.current) {
        trailRef.current.style.transform = `translate(${trailPos.current.x}px, ${trailPos.current.y}px)`;
      }
      animId = requestAnimationFrame(animateTrail);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animId = requestAnimationFrame(animateTrail);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <div ref={glowRef} className="cursor_glow" />
      <div ref={trailRef} className="cursor_trail" />
    </>
  );
};

export default CursorGlow;

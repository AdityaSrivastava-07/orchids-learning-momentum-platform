"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TrailDot {
  id: number;
  x: number;
  y: number;
}

export function CursorTrail() {
  const [trail, setTrail] = useState<TrailDot[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const addToTrail = useCallback((x: number, y: number) => {
    const newDot: TrailDot = {
      id: Date.now() + Math.random(),
      x,
      y,
    };
    setTrail((prev) => [...prev.slice(-15), newDot]);
  }, []);

  useEffect(() => {
    let animationId: number;
    let lastTime = 0;
    const throttleMs = 30;

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastTime > throttleMs) {
        setMousePos({ x: e.clientX, y: e.clientY });
        addToTrail(e.clientX, e.clientY);
        lastTime = now;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [addToTrail]);

  useEffect(() => {
    const cleanup = setInterval(() => {
      setTrail((prev) => prev.slice(1));
    }, 50);

    return () => clearInterval(cleanup);
  }, []);

  return (
    <>
      <motion.div
        className="pointer-events-none fixed z-[9999] h-5 w-5 rounded-full mix-blend-difference"
        style={{
          background: "linear-gradient(135deg, #00f5ff, #a855f7)",
          boxShadow: "0 0 20px #00f5ff, 0 0 40px #a855f7",
        }}
        animate={{
          x: mousePos.x - 10,
          y: mousePos.y - 10,
          scale: [1, 1.2, 1],
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          scale: {
            duration: 0.3,
            repeat: Infinity,
          },
        }}
      />
      <AnimatePresence>
        {trail.map((dot, index) => (
          <motion.div
            key={dot.id}
            className="pointer-events-none fixed z-[9998] rounded-full"
            style={{
              width: `${6 + index * 0.5}px`,
              height: `${6 + index * 0.5}px`,
              background: `linear-gradient(135deg, rgba(0, 245, 255, ${0.3 + index * 0.04}), rgba(168, 85, 247, ${0.3 + index * 0.04}))`,
              boxShadow: `0 0 ${5 + index}px rgba(0, 245, 255, 0.5)`,
            }}
            initial={{
              x: dot.x - 3,
              y: dot.y - 3,
              opacity: 0.8,
              scale: 1,
            }}
            animate={{
              opacity: 0,
              scale: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0,
            }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
            }}
          />
        ))}
      </AnimatePresence>
    </>
  );
}

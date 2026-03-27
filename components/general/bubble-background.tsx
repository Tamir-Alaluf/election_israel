"use client";

import {
  motion,
  type SpringOptions,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useCallback, useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface BubbleBackgroundProps {
  className?: string;
  children?: ReactNode;
  interactive?: boolean;
  transition?: SpringOptions;
  colors?: {
    first: string;
    second: string;
    third: string;
    fourth: string;
  };
}

export function BubbleBackground({
  className,
  children,
  interactive = true,
  transition = { stiffness: 100, damping: 20 },
  colors = {
    // Original soft blue palette from the previous design.
    first: "155,182,198", // #9BB6C6
    second: "181,204,217", // #b5ccd9
    third: "200,219,229", // #c8dbe5
    fourth: "155,182,198", // #9BB6C6
  },
}: BubbleBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, transition);
  const springY = useSpring(mouseY, transition);
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    },
    [mouseX, mouseY],
  );

  useEffect(() => {
    if (!interactive) return;
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [interactive, handleMouseMove]);

  const makeGradient = (color: string) =>
    `radial-gradient(circle at center, rgba(${color}, 0.8) 0%, rgba(${color}, 0) 50%)`;

  return (
    //This div create the full screen background layer
    <div
      ref={containerRef}
      aria-hidden="true"
      className={cn(
        "fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-[#F7F8F8]",
        className,
      )}
    >
      {/* This svg create the goo effect */}
      <svg className="hidden" aria-hidden="true">
        <defs>
          <filter id="bubble-goo">
            <feGaussianBlur
              in="SourceGraphic"
              result="blur"
              stdDeviation="10"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              result="goo"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      {/* This div create the bubbles */}
      <div className="absolute inset-0" style={{ filter: "url(#bubble-goo) " }}>
        {/* This motion.div create the first bubble */}
        <motion.div
          className="absolute rounded-full mix-blend-hard-light"
          style={{
            width: "86%",
            height: "86%",
            top: "-10%",
            left: "-10%",
            background: makeGradient(colors.first),
          }}
          animate={{
            x: [-190, 160, -130, -190],
            y: [-70, 120, -60, -70],
            scale: [1, 1.08, 0.95, 1],
          }}
          transition={{
            duration: 12,
            ease: "easeInOut",
            repeat: Number.POSITIVE_INFINITY,
          }}
        />

        {/* This motion.div create the second bubble */}
        <motion.div
          className="absolute rounded-full mix-blend-hard-light"
          style={{
            width: "72%",
            height: "62%",
            top: "46%",
            left: "12%",
            background: makeGradient(colors.second),
          }}
          animate={{
            x: [90, -120, 60, 90],
            y: [100, -80, -120, 100],
            scale: [1, 0.92, 1.05, 1],
          }}
          transition={{
            duration: 12,
            ease: "easeInOut",
            repeat: Number.POSITIVE_INFINITY,
          }}
        />

        {/* This motion.div create the third bubble */}
        <motion.div
          className="absolute rounded-full mix-blend-hard-light"
          style={{
            width: "68%",
            height: "88%",
            top: "20%",
            left: "50%",
            background: makeGradient(colors.third),
          }}
          animate={{
            x: [-70, 40, 80, -70],
            y: [-60, 20, 60, -60],
            scale: [1, 1.06, 0.9, 1],
          }}
          transition={{
            duration: 12,
            ease: "easeInOut",
            repeat: Number.POSITIVE_INFINITY,
          }}
        />

        {/* This motion.div create the mouse bubble */}
        {interactive && (
          <motion.div
            className="absolute rounded-full mix-blend-hard-light "
            style={{
              width: "32%",
              height: "32%",
              top: "34%",
              left: "34%",
              background: makeGradient(colors.fourth),
              x: springX,
              y: springY,
            }}
          />
        )}
      </div>

      {children && (
        <div className="relative z-10 h-full w-full">{children}</div>
      )}
    </div>
  );
}

"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";

/**
 * Real Lenis smooth scroll (not a hand-rolled wheel interceptor). Modern Lenis
 * drives native scroll, so position: sticky, IntersectionObserver, and anchor
 * links all keep working. Disabled entirely when the user prefers reduced
 * motion so the page falls back to the browser's native scroll.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}

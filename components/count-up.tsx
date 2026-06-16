"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

/**
 * Count-up number that animates from 0 to `to` once it scrolls into view.
 * Renders only the number (units like "K+" / "%" are styled separately by the
 * parent so the lime accent stays in markup). Eased and timed to match the
 * source HTML (1.7s, quartic ease-out).
 */
export function CountUp({
  to,
  duration = 1700,
  className,
}: {
  to: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView || reduced || to === 0) return;
    let rafId = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setVal(Math.round(to * eased));
      if (p < 1) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [inView, reduced, to, duration]);

  // Static cases (reduced motion or a zero target) show the final value without
  // animating, so no state is set inside the effect for them.
  const display = reduced || to === 0 ? to : val;

  return (
    <span ref={ref} className={className}>
      {display.toLocaleString("en-US")}
    </span>
  );
}

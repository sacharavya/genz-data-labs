"use client";

import { useRef } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Magnetic hover: the wrapped element drifts toward the cursor and springs back
 * on leave. Ported from the source HTML. Only active on fine pointers (mouse)
 * and when reduced motion is not requested; the check runs at event time so no
 * state/effect is needed.
 */
export function Magnetic({
  children,
  className,
  strength = 22,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const raf = useRef<number | null>(null);
  const pos = useRef({ x: 0, y: 0 });
  const reduced = useReducedMotion();

  const enabled = () =>
    !reduced &&
    typeof window !== "undefined" &&
    window.matchMedia("(pointer:fine)").matches;

  const apply = () => {
    const el = ref.current;
    if (el) {
      el.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
    }
    raf.current = null;
  };

  const onMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    const el = ref.current;
    if (!el || !enabled()) return;
    const r = el.getBoundingClientRect();
    pos.current.x = ((e.clientX - r.left - r.width / 2) / (r.width / 2)) * strength;
    pos.current.y = ((e.clientY - r.top - r.height / 2) / (r.height / 2)) * strength;
    if (raf.current == null) raf.current = requestAnimationFrame(apply);
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    if (raf.current != null) {
      cancelAnimationFrame(raf.current);
      raf.current = null;
    }
    el.style.transition = "transform .5s cubic-bezier(.16,1,.3,1)";
    el.style.transform = "translate3d(0,0,0)";
    window.setTimeout(() => {
      if (el) el.style.transition = "";
    }, 500);
  };

  const onEnter = () => {
    const el = ref.current;
    if (el) el.style.transition = "";
  };

  return (
    <span
      ref={ref}
      className={`inline-block will-change-transform ${className ?? ""}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onMouseEnter={onEnter}
    >
      {children}
    </span>
  );
}

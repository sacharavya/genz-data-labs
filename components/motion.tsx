"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/** cubic-bezier(.16,1,.3,1), the easing used across the source HTML reveals */
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
/** CSS `ease`, used by the source .fade transition */
const EASE = [0.25, 0.1, 0.25, 1] as const;

type Tag =
  | "div"
  | "span"
  | "p"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "li"
  | "blockquote"
  | "article";

interface MotionWrapperProps {
  children: ReactNode;
  className?: string;
  as?: Tag;
  delay?: number;
  amount?: number;
}

/**
 * Clip-path reveal (the source `.rv`): wipes the element in from the top edge
 * as it enters the viewport. Fires once.
 */
export function Reveal({
  children,
  className,
  as = "div",
  delay = 0,
  amount = 0.18,
}: MotionWrapperProps) {
  const reduced = useReducedMotion();
  const M = motion[as] as typeof motion.div;

  if (reduced) {
    return <M className={className}>{children}</M>;
  }

  return (
    <M
      className={className}
      style={{ willChange: "clip-path" }}
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      whileInView={{ clipPath: "inset(0 0 -10% 0)" }}
      viewport={{ once: true, amount }}
      transition={{ duration: 1, ease: EASE_OUT_EXPO, delay }}
    >
      {children}
    </M>
  );
}

/**
 * Fade + rise (the source `.fade`): opacity 0 and translateY(20px) settling to
 * resting position as it enters the viewport. Fires once.
 */
export function FadeUp({
  children,
  className,
  as = "div",
  delay = 0,
  amount = 0.18,
}: MotionWrapperProps) {
  const reduced = useReducedMotion();
  const M = motion[as] as typeof motion.div;

  if (reduced) {
    return <M className={className}>{children}</M>;
  }

  return (
    <M
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </M>
  );
}

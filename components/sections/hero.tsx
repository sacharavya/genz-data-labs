"use client";

import { motion, useReducedMotion } from "motion/react";
import { FadeUp } from "@/components/motion";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const LINES = [
  { text: "We grow brands", serif: false },
  { text: "organically", serif: true },
  { text: "not on ad spend.", serif: false },
];

export function Hero({ availability }: { availability: string }) {
  const reduced = useReducedMotion();

  return (
    <section
      id="top"
      className="flex min-h-[100svh] flex-col justify-between pb-10 pt-[120px]"
    >
      <div className="wrap">
        <FadeUp
          as="span"
          className="inline-flex items-center gap-[11px] font-mono text-[12.5px] uppercase tracking-[0.08em] text-ink-dim"
        >
          <span className="blip" aria-hidden="true" />
          {availability}
        </FadeUp>
      </div>

      <div className="wrap">
        <h1 className="mt-auto text-[clamp(48px,11.5vw,184px)] font-[680] uppercase leading-[0.9] tracking-[-0.045em]">
          {LINES.map((ln, i) => (
            <span key={ln.text} className="block overflow-hidden">
              <motion.span
                className={
                  ln.serif
                    ? "block font-serif italic normal-case text-acc"
                    : "block"
                }
                initial={reduced ? false : { y: "105%" }}
                animate={reduced ? undefined : { y: 0 }}
                transition={{
                  duration: 1.05,
                  ease: EASE_OUT_EXPO,
                  delay: 0.18 + i * 0.12,
                }}
              >
                {ln.text}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="mt-[54px] flex flex-wrap items-end justify-between gap-[30px]">
          <FadeUp
            as="p"
            className="max-w-[40ch] text-[clamp(16px,1.5vw,20px)] text-ink-dim"
          >
            An organic-growth agency for businesses that want traffic they{" "}
            <b className="font-semibold text-ink">own</b>, not traffic they rent.
            Search, content, and brand that compound long after the invoice
            clears.
          </FadeUp>
          <FadeUp
            as="span"
            className="flex items-center gap-[10px] font-mono text-[11px] uppercase tracking-[0.12em] text-ink-faint"
          >
            Scroll{" "}
            <span className="bob" aria-hidden="true">
              &darr;
            </span>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

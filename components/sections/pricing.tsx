"use client";

import { useMemo, useState } from "react";
import { FadeUp } from "@/components/motion";
import type { PricingItem } from "@/lib/types";

export function Pricing({
  items,
  currency = "CAD",
  note,
}: {
  items: PricingItem[];
  currency?: string;
  note?: string;
}) {
  const [checked, setChecked] = useState<boolean[]>(() =>
    items.map((i) => i.defaultOn !== false),
  );

  const toggle = (index: number) =>
    setChecked((prev) => prev.map((c, i) => (i === index ? !c : c)));

  const total = useMemo(
    () =>
      items.reduce(
        (sum, item, i) => sum + (checked[i] ? item.monthlyPrice || 0 : 0),
        0,
      ),
    [checked, items],
  );

  const fmt = (n: number) => n.toLocaleString("en-US");

  if (!items || items.length === 0) return null;

  return (
    <section className="py-[clamp(90px,13vw,200px)]" id="pricing">
      <div className="wrap">
        <div className="mb-[clamp(40px,6vw,90px)] flex flex-wrap items-end justify-between gap-5">
          <h2 className="text-[clamp(38px,7vw,108px)] font-[720] uppercase leading-[0.92] tracking-[-0.04em]">
            Build your{" "}
            <span className="font-serif normal-case italic text-acc">
              retainer
            </span>
          </h2>
          <FadeUp
            as="span"
            className="font-mono text-[12px] uppercase tracking-[0.1em] text-ink-faint"
          >
            (04) / Check what you need, see the price
          </FadeUp>
        </div>

        <div
          className="border-t border-line-2"
          role="group"
          aria-label="Retainer line items"
        >
          {items.map((item, i) => {
            const on = checked[i] ?? false;
            return (
              <label
                key={i}
                className="grid cursor-pointer grid-cols-[26px_1fr_auto] items-center gap-x-[clamp(16px,3vw,40px)] gap-y-2 border-b border-line-2 py-[clamp(20px,2.4vw,36px)]"
              >
                <input
                  type="checkbox"
                  checked={on}
                  onChange={() => toggle(i)}
                  className="peer sr-only"
                />
                <span
                  aria-hidden="true"
                  className={`flex h-[22px] w-[22px] items-center justify-center border transition-colors peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-acc ${
                    on ? "border-acc bg-acc text-bg" : "border-ink-faint text-transparent"
                  }`}
                >
                  <svg
                    viewBox="0 0 16 16"
                    className="h-3 w-3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M2 8.5L6 12.5L14 3.5" strokeLinecap="square" />
                  </svg>
                </span>

                <span className="min-w-0">
                  <span
                    className={`block text-[clamp(18px,2.2vw,28px)] font-[640] uppercase leading-tight tracking-[-0.02em] transition-colors ${
                      on ? "text-ink" : "text-ink-faint"
                    }`}
                  >
                    {item.name}
                  </span>
                  {item.description && (
                    <span
                      className={`mt-1.5 block max-w-[52ch] font-mono text-[12px] leading-[1.5] transition-colors ${
                        on ? "text-ink-dim" : "text-ink-faint"
                      }`}
                    >
                      {item.description}
                    </span>
                  )}
                </span>

                <span
                  className={`text-right font-mono text-[clamp(15px,1.6vw,20px)] tabular-nums transition-colors ${
                    on ? "text-ink" : "text-ink-faint"
                  }`}
                >
                  ${fmt(item.monthlyPrice || 0)}
                  <span className="text-ink-faint">/mo</span>
                </span>
              </label>
            );
          })}
        </div>

        <div className="mt-[clamp(34px,5vw,64px)] flex flex-wrap items-end justify-between gap-6">
          <div>
            <div
              className="text-[clamp(40px,7vw,96px)] font-[780] leading-[0.86] tracking-[-0.045em] tabular-nums"
              aria-live="polite"
            >
              ${fmt(total)}
              <span className="text-acc">/mo</span>
            </div>
            <div className="mt-3 font-mono text-[12px] uppercase tracking-[0.05em] text-ink-dim">
              Estimated monthly retainer, {currency}
            </div>
          </div>
          {note && (
            <p className="max-w-[40ch] font-mono text-[12px] leading-[1.6] text-ink-faint">
              {note}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

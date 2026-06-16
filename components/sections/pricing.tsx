"use client";

import { useMemo, useState } from "react";
import { FadeUp } from "@/components/motion";
import type { PricingItem } from "@/lib/types";

// Brand/policy copy lives in code (the editable line items + prices come from
// siteSettings). Rendered as expressions so quotes/apostrophes need no escaping.
const LEAD = "yes, we publish our pricing. agencies hate this.";
const INTRO =
  'This is a real retainer, the one running at RP Nails right now, not a "starting from" teaser. Untick anything you don’t need and watch the total update.';
const TAGLINE = "Organic growth compounds; shorter engagements can't show it";

const BLOCKS: {
  label: string;
  body: string;
  details?: { summary: string; items: string[] };
}[] = [
  {
    label: "When the base is built",
    body: "Everything we build is yours. Accounts, content systems, playbooks, rankings. Once the organic base is set, we hand it all over. Run it yourself, or continue the retainer at the same price and we'll manage paid ads on top. You only cover the ad spend.",
  },
  {
    label: "Why 6 months minimum",
    body: "Organic compounds. Reviews, rankings, and audiences build on each other, so we ask for six months to deliver something real. After that it's month to month, 30 days' notice.",
  },
  {
    label: "Not included in the retainer",
    body: "Full website rebuilds, branding refreshes, and custom software (like the Big Bang CRM) are one-time projects, scoped and priced on their own. The retainer covers ongoing site edits only.",
    details: {
      summary: "Click here for approximate pricing",
      items: [
        "Custom software (CRMs, booking systems, internal platforms): projects start at $10,000 USD, scoped after a discovery call.",
        "Website rebuilds and branding: quoted per project based on scope, starting at $5,000 USD.",
      ],
    },
  },
  {
    label: "First step, always",
    body: "A free scored audit of your current presence. You see exactly where you stand before a dollar changes hands.",
  },
];

export function Pricing({
  items,
  note,
}: {
  items: PricingItem[];
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
        <div className="mb-[clamp(28px,4vw,56px)] flex flex-wrap items-end justify-between gap-5">
          <h2 className="text-[clamp(38px,7vw,108px)] font-[720] uppercase leading-[0.92] tracking-[-0.04em]">
            What it{" "}
            <span className="font-serif normal-case italic text-acc">costs</span>
          </h2>
          <FadeUp
            as="span"
            className="font-mono text-[12px] uppercase tracking-[0.1em] text-ink-faint"
          >
            (04) / Transparent by default
          </FadeUp>
        </div>

        <div className="mb-[clamp(40px,6vw,80px)] max-w-[60ch]">
          <p className="font-serif text-[clamp(24px,3.2vw,40px)] italic leading-[1.12] text-ink">
            {LEAD}
          </p>
          <p className="mt-6 text-[clamp(16px,1.5vw,20px)] leading-[1.55] text-ink-dim">
            {INTRO}
          </p>
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
                className="grid cursor-pointer grid-cols-[24px_1fr_auto] items-start gap-x-[clamp(14px,2.5vw,32px)] gap-y-2 border-b border-line-2 py-[clamp(20px,2.4vw,34px)]"
              >
                <input
                  type="checkbox"
                  checked={on}
                  onChange={() => toggle(i)}
                  className="peer sr-only"
                />
                <span
                  aria-hidden="true"
                  className={`mt-1 flex h-[22px] w-[22px] items-center justify-center border transition-colors peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-acc ${
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
                      className={`mt-2 block max-w-[60ch] font-mono text-[12px] leading-[1.55] transition-colors ${
                        on ? "text-ink-dim" : "text-ink-faint"
                      }`}
                    >
                      {item.description}
                    </span>
                  )}
                </span>

                <span
                  className={`mt-1 text-right font-mono text-[clamp(15px,1.6vw,20px)] tabular-nums transition-colors ${
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

        <div className="mt-[clamp(34px,5vw,64px)] flex flex-wrap items-end justify-between gap-6 border-b border-line-2 pb-[clamp(34px,5vw,64px)]">
          <div>
            <div className="mb-3 font-mono text-[12px] uppercase tracking-[0.08em] text-ink-dim">
              Your monthly retainer
            </div>
            <div
              className="text-[clamp(48px,8vw,120px)] font-[780] leading-[0.84] tracking-[-0.05em] tabular-nums"
              aria-live="polite"
            >
              ${fmt(total)}
              <span className="text-acc">/mo</span>
            </div>
          </div>
          <div className="max-w-[34ch] text-right font-mono text-[11px] uppercase leading-[1.7] tracking-[0.05em] text-ink-faint">
            {note && <p className="text-ink-dim">{note}</p>}
            <p className="mt-2">{TAGLINE}</p>
          </div>
        </div>

        <div className="mt-[clamp(40px,6vw,80px)] grid grid-cols-1 gap-px bg-line-2 min-[760px]:grid-cols-2">
          {BLOCKS.map((block) => (
            <div key={block.label} className="bg-bg p-[clamp(24px,3vw,40px)]">
              <h3 className="mb-4 font-mono text-[12px] uppercase tracking-[0.08em] text-acc">
                {block.label}
              </h3>
              <p className="text-[15.5px] leading-[1.6] text-ink-dim">
                {block.body}
              </p>
              {block.details && (
                <details className="group mt-5 border-t border-line-2 pt-4">
                  <summary className="cursor-pointer list-none font-mono text-[12px] uppercase tracking-[0.06em] text-acc transition-opacity hover:opacity-70 [&::-webkit-details-marker]:hidden">
                    {block.details.summary}
                    <span className="ml-2 inline-block transition-transform group-open:rotate-90" aria-hidden="true">
                      &rarr;
                    </span>
                  </summary>
                  <div className="mt-4 space-y-3">
                    {block.details.items.map((line, i) => (
                      <p
                        key={i}
                        className="font-mono text-[12.5px] leading-[1.6] text-ink-dim"
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </details>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

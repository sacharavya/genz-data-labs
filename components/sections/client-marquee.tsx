const ITEMS: { label: string; dim?: boolean }[] = [
  { label: "RP Nails" },
  { label: "Organic", dim: true },
  { label: "Big Bang Immigration" },
  { label: "Content", dim: true },
  { label: "CRF Parfums" },
  { label: "Brand", dim: true },
];

function Run() {
  return (
    <>
      {ITEMS.map((item, i) =>
        item.dim ? (
          <span
            key={`${item.label}-${i}`}
            className="inline-flex items-center gap-[0.5em] px-[0.35em] text-[clamp(30px,4.6vw,68px)] font-[760] uppercase tracking-[-0.03em] text-transparent [-webkit-text-stroke:1px_var(--ink-faint)]"
          >
            {item.label}
          </span>
        ) : (
          <span
            key={`${item.label}-${i}`}
            className="inline-flex items-center gap-[0.5em] px-[0.35em] text-[clamp(30px,4.6vw,68px)] font-[760] uppercase tracking-[-0.03em]"
          >
            {item.label} <span className="text-[0.5em] text-acc">&#10022;</span>
          </span>
        ),
      )}
    </>
  );
}

export function ClientMarquee() {
  return (
    <div
      className="overflow-hidden whitespace-nowrap border-y border-line py-[26px]"
      aria-hidden="true"
    >
      <div className="marquee-track">
        <Run />
        <Run />
      </div>
    </div>
  );
}

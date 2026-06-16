import { AnimatedNumber } from "@/components/animated-number";
import type { MainStat } from "@/lib/types";

export function Stats({ stats }: { stats: MainStat[] }) {
  return (
    <div className="border-y border-line">
      <div className="wrap !px-0">
        <div className="grid grid-cols-1 gap-px bg-line min-[520px]:grid-cols-2 min-[900px]:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`bg-bg px-[clamp(18px,2.4vw,40px)] py-[clamp(40px,5vw,80px)] ${
                i === 0 ? "min-[900px]:pl-[clamp(20px,4vw,64px)]" : ""
              }`}
            >
              <div className="text-[clamp(48px,6.4vw,104px)] font-[780] leading-[0.86] tracking-[-0.045em] [font-variant-numeric:tabular-nums]">
                {stat.prefix}
                <AnimatedNumber value={stat.number} />
                {stat.unit && <span className="text-acc">{stat.unit}</span>}
              </div>
              {stat.label && (
                <div className="mt-[18px] max-w-[22ch] font-mono text-[12px] uppercase leading-[1.6] tracking-[0.05em] text-ink-dim">
                  {stat.label}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import { FadeUp } from "@/components/motion";
import { AnimatedNumber } from "@/components/animated-number";
import { PortableText } from "@/components/portable-text";
import type { CaseStudy } from "@/lib/types";

function CaseCard({ data }: { data: CaseStudy }) {
  const disc = [data.sector, data.location, data.scope]
    .filter(Boolean)
    .join(" · ");
  const linked = Boolean(data.hasCasePage);
  const href = `/work/${data.slug}`;

  const clientName = (
    <span className="block text-[clamp(34px,5.6vw,92px)] font-[740] uppercase leading-[0.92] tracking-[-0.035em]">
      {data.clientName}
    </span>
  );

  return (
    <article className="static min-h-0 border-t border-line-2 bg-bg pb-[50px] pt-[clamp(34px,4vw,60px)] min-[860px]:sticky min-[860px]:top-0 min-[860px]:min-h-[88vh] min-[860px]:pb-0">
      <div className="grid grid-cols-1 gap-[clamp(20px,4vw,60px)] min-[860px]:grid-cols-[88px_1fr]">
        <div className="font-mono text-[14px] text-acc min-[860px]:pt-2">
          {data.caseNumber}
        </div>

        <div className="grid grid-cols-1 gap-[clamp(24px,4vw,64px)] min-[860px]:grid-cols-[1.3fr_1fr]">
          <div>
            {linked ? (
              <Link href={href} className="link-underline inline-block">
                {clientName}
              </Link>
            ) : (
              clientName
            )}

            {disc && (
              <div className="mt-5 font-mono text-[12px] uppercase tracking-[0.08em] text-ink-dim">
                {disc}
              </div>
            )}

            {data.card?.problem && (
              <div className="mt-[30px] max-w-[50ch] text-[clamp(17px,1.6vw,21px)] leading-[1.55] text-ink-dim">
                <PortableText value={data.card.problem} />
              </div>
            )}

            {data.card?.result && (
              <p className="mt-[26px] max-w-[32ch] font-serif text-[clamp(22px,2.6vw,34px)] italic leading-[1.2] text-ink">
                {data.card.result}
              </p>
            )}
          </div>

          <div className="flex flex-col justify-end gap-2 border-t border-line-2 pt-6 min-[860px]:border-l min-[860px]:border-t-0 min-[860px]:pl-[clamp(20px,3vw,44px)] min-[860px]:pt-0">
            <div className="text-[clamp(56px,9vw,150px)] font-[780] leading-[0.82] tracking-[-0.05em] [font-variant-numeric:tabular-nums]">
              <AnimatedNumber value={data.card?.metricNumber} />
              {data.card?.metricUnit && (
                <span className="text-acc">{data.card.metricUnit}</span>
              )}
            </div>

            {data.card?.metricLabel && (
              <div className="max-w-[24ch] font-mono text-[12px] uppercase tracking-[0.06em] text-ink-dim">
                {data.card.metricLabel}
              </div>
            )}

            {data.card?.subStats && data.card.subStats.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-[26px]">
                {data.card.subStats.map((s, i) => (
                  <span key={i} className="font-mono text-[12.5px] text-ink-dim">
                    {s.label && `${s.label} `}
                    <b className="font-medium text-acc">{s.value}</b>
                  </span>
                ))}
              </div>
            )}

            <div className="mt-6 font-mono text-[12.5px] uppercase tracking-[0.04em] text-ink-dim">
              {linked ? (
                <Link href={href} className="link-underline">
                  Read the case study &rarr;
                </Link>
              ) : (
                data.card?.footer
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export function Cases({ caseStudies }: { caseStudies: CaseStudy[] }) {
  return (
    <section className="pb-0 pt-[clamp(90px,13vw,200px)]" id="work">
      <div className="wrap">
        <div className="mb-[clamp(40px,6vw,90px)] flex flex-wrap items-end justify-between gap-5">
          <h2 className="text-[clamp(38px,7vw,108px)] font-[720] uppercase leading-[0.92] tracking-[-0.04em]">
            Selected{" "}
            <span className="font-serif normal-case italic text-acc">work</span>
          </h2>
          <FadeUp
            as="span"
            className="font-mono text-[12px] uppercase tracking-[0.1em] text-ink-faint"
          >
            (02) / Three clients, zero ad budgets
          </FadeUp>
        </div>
      </div>

      <div className="wrap">
        {caseStudies.map((c) => (
          <CaseCard key={c.slug} data={c} />
        ))}
      </div>
    </section>
  );
}

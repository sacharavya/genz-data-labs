import type { ReactNode } from "react";
import { FadeUp } from "@/components/motion";

interface Service {
  no: string;
  name: ReactNode;
  detail: string;
}

const SERVICES: Service[] = [
  {
    no: "01",
    name: "SEO & Local Search",
    detail:
      "GBP optimization, technical SEO, local content from scored audits. Calls and bookings, not vanity rankings.",
  },
  {
    no: "02",
    name: (
      <>
        Social &{" "}
        <span className="font-serif normal-case italic">Content</span>
      </>
    ),
    detail:
      "Every platform. We find where your audience actually is and build there. The system behind 80K+ organic followers.",
  },
  {
    no: "03",
    name: "Video & Creative",
    detail:
      "Short-form video and brand assets, produced in-house and iterated against real performance data.",
  },
  {
    no: "04",
    name: (
      <>
        Web &{" "}
        <span className="font-serif normal-case italic">Software</span>
      </>
    ),
    detail:
      "Sites built to rank and convert. Custom CRMs, booking systems, and platforms when templates stop fitting.",
  },
  {
    no: "05",
    name: "Analytics",
    detail:
      "A scored baseline on day one, then plain-language reporting every month. If it can't be measured, it didn't happen.",
  },
];

export function Services() {
  return (
    <section className="py-[clamp(90px,13vw,200px)]" id="services">
      <div className="wrap">
        <div className="mb-[clamp(40px,6vw,90px)] flex flex-wrap items-end justify-between gap-5">
          <h2 className="text-[clamp(38px,7vw,108px)] font-[720] uppercase leading-[0.92] tracking-[-0.04em]">
            What we{" "}
            <span className="font-serif normal-case italic text-acc">do</span>
          </h2>
          <FadeUp
            as="span"
            className="font-mono text-[12px] uppercase tracking-[0.1em] text-ink-faint"
          >
            (03) / End to end, under one roof
          </FadeUp>
        </div>

        <div className="border-t border-line-2">
          {SERVICES.map((svc) => (
            <div
              key={svc.no}
              className="group relative grid cursor-default grid-cols-[44px_1fr] items-center gap-[clamp(16px,3vw,40px)] border-b border-line-2 py-[clamp(22px,2.6vw,40px)] transition-[padding-left] duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:pl-[clamp(12px,2vw,32px)] min-[760px]:grid-cols-[88px_1fr_auto]"
            >
              <div
                aria-hidden="true"
                className="absolute left-0 top-0 z-0 h-full w-0 bg-acc opacity-[0.06] transition-[width] duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full"
              />
              <span className="relative z-[1] font-mono text-[13px] text-ink-faint">
                {svc.no}
              </span>
              <span className="relative z-[1] text-[clamp(26px,4.4vw,62px)] font-[680] uppercase leading-none tracking-[-0.03em] transition-colors group-hover:text-acc">
                {svc.name}
              </span>
              <span className="relative z-[1] col-start-2 max-w-none translate-x-0 text-left font-mono text-[12.5px] text-ink-dim opacity-70 transition-[opacity,transform] duration-[400ms] ease-out min-[760px]:col-start-auto min-[760px]:max-w-[30ch] min-[760px]:translate-x-[10px] min-[760px]:text-right min-[760px]:opacity-50 min-[760px]:group-hover:translate-x-0 min-[760px]:group-hover:opacity-100">
                {svc.detail}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

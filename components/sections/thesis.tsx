import { FadeUp, Reveal } from "@/components/motion";

export function Thesis() {
  return (
    <section className="py-[clamp(90px,13vw,200px)]" id="approach">
      <div className="wrap grid grid-cols-1 items-start gap-[clamp(30px,6vw,100px)] min-[860px]:grid-cols-[1fr_1.5fr]">
        <div className="min-[860px]:sticky min-[860px]:top-[120px]">
          <FadeUp
            as="span"
            className="font-mono text-[12px] uppercase tracking-[0.1em] text-ink-faint"
          >
            (01) / Approach
          </FadeUp>
        </div>

        <div>
          <Reveal
            as="p"
            className="text-[clamp(28px,3.6vw,52px)] font-semibold leading-[1.08] tracking-[-0.03em]"
          >
            Paid ads are a tap somebody else controls. Turn off the money and the
            traffic dies the same day. We build the{" "}
            <span className="font-serif text-[1.08em] italic text-acc">other</span>{" "}
            kind of growth.
          </Reveal>

          <div className="mt-[clamp(30px,4vw,60px)] max-w-[60ch]">
            <FadeUp
              as="p"
              className="mb-6 text-[clamp(17px,1.5vw,21px)] leading-[1.6] text-ink-dim"
            >
              Most agencies bill you, route the budget to Google and Meta, keep a
              cut, and mail back a dashboard with &ldquo;impressions&rdquo; on it.
              It works until the second you stop paying. We think that&rsquo;s
              renting your own customers.
            </FadeUp>

            <FadeUp
              as="p"
              className="my-[14px] mb-7 border-l-2 border-acc pl-7 font-serif text-[clamp(26px,3.2vw,42px)] italic leading-[1.18] text-ink"
            >
              Rankings, audiences, reviews, and content are assets. Impressions
              are a receipt.
            </FadeUp>

            <FadeUp
              as="p"
              className="mb-6 text-[clamp(17px,1.5vw,21px)] leading-[1.6] text-ink-dim"
            >
              We come from data, not advertising. Every engagement opens with a
              scored audit, ships work in priority order, and reports plain
              numbers every month.{" "}
              <b className="font-semibold text-ink">
                It is slower than ads. It is also yours forever.
              </b>{" "}
              A page that ranks keeps ranking while you sleep. An audience keeps
              buying. That is the entire thesis.
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Cities, Colophon, MagneticMail } from "@/components/contact-block";
import { FadeUp, Reveal } from "@/components/motion";
import { SITE } from "@/lib/site";
import type { City } from "@/lib/types";

export function CaseCTA({
  eyebrow = "Your turn",
  heading,
  accent,
  email = SITE.email,
  cities,
}: {
  eyebrow?: string;
  heading?: string;
  accent?: string;
  email?: string;
  cities?: City[];
}) {
  return (
    <section id="contact" className="pb-20 pt-[clamp(80px,11vw,170px)]">
      <div className="wrap">
        <FadeUp
          as="p"
          className="mb-9 font-mono text-[12.5px] uppercase tracking-[0.1em] text-acc"
        >
          {eyebrow}
        </FadeUp>
        <Reveal
          as="h2"
          className="text-[clamp(40px,9vw,150px)] font-[720] uppercase leading-[0.86] tracking-[-0.05em]"
        >
          {heading}
          {accent && (
            <>
              {" "}
              <span className="font-serif normal-case italic text-acc">
                {accent}
              </span>
            </>
          )}
        </Reveal>
        <MagneticMail
          email={email}
          className="mt-[clamp(36px,5vw,66px)] text-[clamp(20px,3.4vw,46px)] font-semibold tracking-[-0.025em]"
        />
        <div className="mt-[clamp(60px,9vw,120px)] flex flex-wrap items-end justify-between gap-[30px] border-t border-line pt-[30px]">
          <Cities cities={cities} />
          <Colophon tagline="Built by hand, ranked by Google" />
        </div>
      </div>
    </section>
  );
}

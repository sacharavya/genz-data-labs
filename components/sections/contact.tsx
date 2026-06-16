import { Cities, Colophon, MagneticMail } from "@/components/contact-block";
import { SITE } from "@/lib/site";
import type { City } from "@/lib/types";

export function Contact({
  email = SITE.email,
  cities,
}: {
  email?: string;
  cities?: City[];
}) {
  return (
    <section id="contact" className="pb-[60px] pt-[clamp(90px,13vw,200px)]">
      <div className="wrap">
        <span className="mb-10 block font-mono text-[12px] uppercase tracking-[0.1em] text-ink-faint">
          (05) / Let&rsquo;s build something you own
        </span>
        <h2 className="text-[clamp(48px,12vw,200px)] font-[720] uppercase leading-[0.86] tracking-[-0.05em]">
          Start with a
          <br />
          <span className="font-serif normal-case italic text-acc">free</span>{" "}
          audit.
        </h2>
        <MagneticMail
          email={email}
          className="mt-[clamp(40px,6vw,80px)] text-[clamp(22px,4vw,56px)] font-semibold tracking-[-0.025em]"
        />
        <footer className="mt-[clamp(60px,9vw,130px)] flex flex-wrap items-end justify-between gap-[30px] border-t border-line pt-[30px]">
          <Cities cities={cities} />
          <Colophon />
        </footer>
      </div>
    </section>
  );
}

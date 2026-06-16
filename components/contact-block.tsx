import { Magnetic } from "@/components/magnetic";
import { SITE } from "@/lib/site";
import type { City } from "@/lib/types";

/** Oversized mailto link with magnetic hover, used on the main page and case CTAs. */
export function MagneticMail({
  className,
  email = SITE.email,
}: {
  className?: string;
  email?: string;
}) {
  return (
    <a href={`mailto:${email}`} className={`inline-block ${className ?? ""}`}>
      <Magnetic>
        <span className="link-underline thick">{email}</span>
      </Magnetic>
    </a>
  );
}

export function Cities({
  className,
  cities = SITE.cities,
}: {
  className?: string;
  cities?: readonly City[];
}) {
  return (
    <div
      className={`flex flex-wrap gap-[clamp(20px,3vw,54px)] ${className ?? ""}`}
    >
      {cities.map((c) => (
        <span
          key={c.name}
          className="text-[clamp(18px,2vw,28px)] font-[680] uppercase tracking-[-0.02em]"
        >
          {c.name}
          {c.code && (
            <span className="ml-1 align-super font-mono text-[0.42em] tracking-normal text-ink-faint">
              {c.code}
            </span>
          )}
        </span>
      ))}
    </div>
  );
}

export function Colophon({
  tagline = "Built by hand · ranked by Google",
}: {
  tagline?: string;
}) {
  return (
    <div className="text-right font-mono text-[11.5px] uppercase leading-[1.9] tracking-[0.05em] text-ink-faint">
      {SITE.name} &copy; 2026
      <br />
      Organic by design
      <br />
      {tagline}
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { FadeUp, Reveal } from "@/components/motion";
import { AnimatedNumber } from "@/components/animated-number";
import { PortableText } from "@/components/portable-text";
import { ImageSlot } from "@/components/case/image-slot";
import { ClientQuoteBlock } from "@/components/case/client-quote";
import { CaseCTA } from "@/components/case/case-cta";
import {
  getCaseStudy,
  getCaseStudySlugs,
  getSiteSettings,
} from "@/lib/content";
import { SITE } from "@/lib/site";

export async function generateStaticParams() {
  const slugs = await getCaseStudySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = await getCaseStudy(slug);
  if (!cs) return { title: "Case study, genz technologies" };
  return {
    title: `${cs.clientName}, case study · genz technologies`,
    description: cs.heroSubtitle,
  };
}

const SEC_TAG =
  "mb-[30px] font-mono text-[12px] uppercase tracking-[0.1em] text-ink-faint";

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [cs, settings] = await Promise.all([
    getCaseStudy(slug),
    getSiteSettings(),
  ]);

  if (!cs || cs.hasCasePage === false) notFound();

  const cityTags =
    settings.cities && settings.cities.length > 0
      ? settings.cities
          .map((c) => c.tag)
          .filter(Boolean)
          .join(" / ")
      : SITE.cityTags;

  const eyebrow = [cs.caseNumber, cs.sector, cs.location]
    .filter(Boolean)
    .join(" / ");

  return (
    <>
      <SiteHeader variant="case" cityTags={cityTags} />

      <div className="wrap pt-[104px]">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2.5 font-mono text-[12.5px] uppercase tracking-[0.06em] text-ink-dim transition-colors hover:text-acc"
        >
          &larr; Back to work
        </Link>
      </div>

      {/* HERO */}
      <section className="border-b border-line pb-[clamp(50px,7vw,90px)] pt-[clamp(40px,6vw,80px)]">
        <div className="wrap">
          {eyebrow && (
            <FadeUp
              as="p"
              className="mb-[30px] font-mono text-[12.5px] uppercase tracking-[0.1em] text-acc"
            >
              {eyebrow}
            </FadeUp>
          )}
          <Reveal
            as="h1"
            className="text-[clamp(46px,10vw,170px)] font-[720] uppercase leading-[0.9] tracking-[-0.045em]"
          >
            {cs.clientName}
          </Reveal>
          {cs.heroSubtitle && (
            <FadeUp
              as="p"
              className="mt-[34px] max-w-[52ch] text-[clamp(18px,2vw,26px)] leading-[1.4] text-ink-dim"
            >
              {cs.heroSubtitle}
            </FadeUp>
          )}
          {cs.metaStrip && cs.metaStrip.length > 0 && (
            <FadeUp className="mt-[clamp(40px,5vw,70px)] grid grid-cols-1 gap-px border border-line-2 bg-line-2 min-[480px]:grid-cols-2 min-[860px]:grid-cols-4">
              {cs.metaStrip.map((m, i) => (
                <div key={i} className="bg-bg px-6 py-[22px]">
                  <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-faint">
                    {m.label}
                  </div>
                  <div className="text-[15.5px] font-semibold leading-[1.35] text-ink">
                    {m.value}
                  </div>
                </div>
              ))}
            </FadeUp>
          )}
        </div>
      </section>

      {/* STAT BAND */}
      {cs.statBand && cs.statBand.length > 0 && (
        <div className="border-b border-line">
          <div className="wrap !px-0">
            <div className="grid grid-cols-1 gap-px bg-line min-[860px]:grid-cols-3">
              {cs.statBand.map((s, i) => (
                <div
                  key={i}
                  className={`bg-bg px-[clamp(20px,2.4vw,44px)] py-[clamp(44px,5.5vw,86px)] ${
                    i === 0 ? "min-[860px]:pl-[clamp(20px,4vw,64px)]" : ""
                  }`}
                >
                  <div className="text-[clamp(50px,7vw,120px)] font-[780] leading-[0.84] tracking-[-0.05em] tabular-nums">
                    {s.prefix}
                    <AnimatedNumber value={s.number} />
                    {s.unit && <span className="text-acc">{s.unit}</span>}
                  </div>
                  {s.label && (
                    <div className="mt-[18px] max-w-[26ch] font-mono text-[12px] uppercase leading-[1.6] tracking-[0.05em] text-ink-dim">
                      {s.label}
                    </div>
                  )}
                  {s.footnote && (
                    <div className="mt-2.5 font-mono text-[10.5px] tracking-[0.04em] text-ink-faint">
                      {s.footnote}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TO-FINISH SLOT (optional) */}
      {cs.todoSlot && (
        <section className="border-b border-line py-[clamp(70px,10vw,150px)]">
          <div className="wrap">
            <p className={SEC_TAG}>(00) To finish this page</p>
            <div className="border border-dashed border-line-2 bg-[rgba(98,213,166,0.02)] p-[clamp(24px,3vw,40px)]">
              {cs.todoSlot.title && (
                <div className="mb-3.5 font-mono text-[11px] uppercase tracking-[0.08em] text-acc">
                  {cs.todoSlot.title}
                </div>
              )}
              {cs.todoSlot.intro && (
                <p className="font-mono text-[13px] leading-[1.7] text-ink-dim">
                  {cs.todoSlot.intro}
                </p>
              )}
              {cs.todoSlot.items && cs.todoSlot.items.length > 0 && (
                <ul className="mt-3">
                  {cs.todoSlot.items.map((it, i) => (
                    <li
                      key={i}
                      className="relative py-[5px] pl-[18px] font-mono text-[12.5px] leading-[1.5] text-ink-dim"
                    >
                      <span className="absolute left-0 text-acc" aria-hidden="true">
                        &rarr;
                      </span>
                      {it}
                    </li>
                  ))}
                </ul>
              )}
              {cs.todoSlot.outro && (
                <p className="mt-3.5 font-mono text-[13px] leading-[1.7] text-ink-dim">
                  {cs.todoSlot.outro}
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* PROBLEM + APPROACH */}
      {(cs.problem || cs.approach) && (
        <section className="border-b border-line py-[clamp(70px,10vw,150px)]">
          <div className="wrap">
            <p className={SEC_TAG}>(01) The situation</p>
            <div className="grid grid-cols-1 gap-[clamp(30px,5vw,80px)] min-[860px]:grid-cols-2">
              {cs.problem && (
                <div>
                  <div className="mb-5 border-b border-line-2 pb-3.5 font-mono text-[12px] uppercase tracking-[0.08em] text-acc">
                    The problem
                  </div>
                  <div className="text-[16.5px] leading-[1.6] text-ink-dim">
                    <PortableText value={cs.problem} />
                  </div>
                </div>
              )}
              {cs.approach && (
                <div>
                  <div className="mb-5 border-b border-line-2 pb-3.5 font-mono text-[12px] uppercase tracking-[0.08em] text-acc">
                    Our approach
                  </div>
                  <div className="text-[16.5px] leading-[1.6] text-ink-dim">
                    <PortableText value={cs.approach} />
                  </div>
                </div>
              )}
            </div>
            {cs.gallery && cs.gallery.length > 0 && (
              <div className="mt-[clamp(30px,4vw,56px)] grid grid-cols-1 gap-4 min-[680px]:grid-cols-2">
                {cs.gallery.map((item, i) => (
                  <ImageSlot key={i} item={item} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* WHAT WE BUILT / BLUEPRINT */}
      {cs.buildList && cs.buildList.length > 0 && (
        <section className="border-b border-line py-[clamp(70px,10vw,150px)]">
          <div className="wrap">
            {cs.buildTag && <p className={SEC_TAG}>{cs.buildTag}</p>}
            {(cs.buildHeading || cs.buildHeadingAccent) && (
              <Reveal
                as="h2"
                className="mb-[clamp(30px,4vw,56px)] text-[clamp(30px,4.4vw,62px)] font-[680] uppercase leading-[1.02] tracking-[-0.035em]"
              >
                {cs.buildHeading}
                {cs.buildHeadingAccent && (
                  <>
                    {" "}
                    <span className="font-serif normal-case italic text-acc">
                      {cs.buildHeadingAccent}
                    </span>
                  </>
                )}
              </Reveal>
            )}
            <div className="border-t border-line-2">
              {cs.buildList.map((row, i) => (
                <FadeUp
                  key={i}
                  className="grid grid-cols-[64px_1fr] gap-[clamp(16px,3vw,40px)] border-b border-line-2 py-[clamp(22px,2.6vw,36px)]"
                >
                  <span className="font-mono text-[13px] text-acc">
                    {row.number}
                  </span>
                  <div>
                    {row.heading && (
                      <h4 className="mb-2.5 text-[clamp(20px,2.6vw,30px)] font-[680] tracking-[-0.02em]">
                        {row.heading}
                      </h4>
                    )}
                    {row.body && (
                      <p className="max-w-[62ch] text-[15.5px] leading-[1.55] text-ink-dim">
                        {row.body}
                      </p>
                    )}
                  </div>
                </FadeUp>
              ))}
            </div>
            {cs.techChips && cs.techChips.length > 0 && (
              <FadeUp className="mt-9 flex flex-wrap gap-2.5">
                {cs.techChips.map((chip) => (
                  <span
                    key={chip}
                    className="border border-line-2 px-[15px] py-[9px] font-mono text-[12px] uppercase tracking-[0.04em] text-ink-dim"
                  >
                    {chip}
                  </span>
                ))}
              </FadeUp>
            )}
          </div>
        </section>
      )}

      {/* RESULT */}
      {(cs.resultPullQuote || cs.resultBody || cs.resultSlot) && (
        <section className="border-b border-line py-[clamp(70px,10vw,150px)]">
          <div className="narrow">
            <p className={SEC_TAG}>(03) The result</p>
            {cs.resultPullQuote && (
              <FadeUp
                as="p"
                className="mb-[30px] max-w-[30ch] border-l-2 border-acc pl-[30px] font-serif text-[clamp(26px,3.4vw,46px)] italic leading-[1.16] text-ink"
              >
                {cs.resultPullQuote}
              </FadeUp>
            )}
            {cs.resultBody && (
              <div className="max-w-[64ch] text-[clamp(17px,1.55vw,21px)] leading-[1.62] text-ink-dim">
                <PortableText value={cs.resultBody} />
              </div>
            )}
            {cs.resultSlot && (
              <div className="mt-[clamp(30px,4vw,56px)] border border-dashed border-line-2 bg-[rgba(98,213,166,0.02)] p-[clamp(24px,3vw,40px)]">
                <div className="mb-3.5 font-mono text-[11px] uppercase tracking-[0.08em] text-acc">
                  &#9873; Outcome slot
                </div>
                <p className="font-mono text-[13px] leading-[1.7] text-ink-dim">
                  {cs.resultSlot}
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* CLIENT QUOTE */}
      <ClientQuoteBlock quote={cs.clientQuote} />

      {/* CTA */}
      <CaseCTA
        eyebrow={cs.ctaEyebrow}
        heading={cs.ctaHeading}
        accent={cs.ctaAccent}
        email={settings.contactEmail}
        cities={settings.cities}
      />
    </>
  );
}

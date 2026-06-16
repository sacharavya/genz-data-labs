import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { FadeUp, Reveal } from "@/components/motion";
import { CaseCTA } from "@/components/case/case-cta";
import { getBlogPosts, getSiteSettings } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Journal, genz technologies",
  description: "Notes on organic growth from genz technologies.",
};

export default async function BlogIndex() {
  const [posts, settings] = await Promise.all([
    getBlogPosts(),
    getSiteSettings(),
  ]);

  const cityTags =
    settings.cities && settings.cities.length > 0
      ? settings.cities
          .map((c) => c.tag)
          .filter(Boolean)
          .join(" / ")
      : SITE.cityTags;

  return (
    <>
      <SiteHeader variant="case" cityTags={cityTags} />

      <section className="pb-[clamp(40px,6vw,80px)] pt-[clamp(120px,16vw,200px)]">
        <div className="wrap">
          <FadeUp
            as="p"
            className="mb-[30px] font-mono text-[12.5px] uppercase tracking-[0.1em] text-acc"
          >
            The journal
          </FadeUp>
          <Reveal
            as="h1"
            className="text-[clamp(48px,11vw,170px)] font-[720] uppercase leading-[0.9] tracking-[-0.045em]"
          >
            Notes on organic{" "}
            <span className="font-serif normal-case italic text-acc">
              growth.
            </span>
          </Reveal>
        </div>
      </section>

      <section className="pb-[clamp(40px,8vw,120px)]">
        <div className="wrap">
          {posts.length === 0 ? (
            <p className="border-t border-line-2 py-16 font-mono text-[14px] uppercase tracking-[0.06em] text-ink-dim">
              No posts yet. Check back soon.
            </p>
          ) : (
            <div className="border-t border-line-2">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group grid grid-cols-1 items-baseline gap-x-[clamp(20px,4vw,60px)] gap-y-4 border-b border-line-2 py-[clamp(28px,3.4vw,52px)] transition-[padding-left] duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:pl-[clamp(12px,2vw,28px)] min-[860px]:grid-cols-[160px_1fr]"
                >
                  <span className="font-mono text-[12.5px] uppercase tracking-[0.06em] text-ink-faint">
                    {formatDate(post.publishedAt)}
                  </span>
                  <div>
                    <h2 className="text-[clamp(26px,4vw,52px)] font-[680] uppercase leading-[1.02] tracking-[-0.03em] transition-colors group-hover:text-acc">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="mt-4 max-w-[64ch] text-[clamp(15px,1.4vw,18px)] leading-[1.55] text-ink-dim">
                        {post.excerpt}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <CaseCTA
        eyebrow="Your turn"
        heading="Start with a free"
        accent="audit."
        email={settings.contactEmail}
        cities={settings.cities}
      />
    </>
  );
}

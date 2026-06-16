import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { SanityImageSource } from "@sanity/image-url";
import { SiteHeader } from "@/components/site-header";
import { FadeUp, Reveal } from "@/components/motion";
import { PortableText } from "@/components/portable-text";
import { CaseCTA } from "@/components/case/case-cta";
import { getBlogPost, getBlogSlugs, getSiteSettings } from "@/lib/content";
import { urlForImage } from "@/sanity/lib/image";
import { formatDate } from "@/lib/format";
import { SITE } from "@/lib/site";

export async function generateStaticParams() {
  const slugs = await getBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return { title: "Post, genz technologies" };
  return {
    title: `${post.title}, genz technologies`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [post, settings] = await Promise.all([
    getBlogPost(slug),
    getSiteSettings(),
  ]);

  if (!post) notFound();

  const cityTags =
    settings.cities && settings.cities.length > 0
      ? settings.cities
          .map((c) => c.tag)
          .filter(Boolean)
          .join(" / ")
      : SITE.cityTags;

  const meta = [formatDate(post.publishedAt), post.author]
    .filter(Boolean)
    .join(" · ");

  const hasCover = Boolean(
    post.coverImage?.asset?._ref || post.coverImage?.asset?.url,
  );

  return (
    <>
      <SiteHeader variant="case" cityTags={cityTags} />

      <div className="wrap pt-[104px]">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2.5 font-mono text-[12.5px] uppercase tracking-[0.06em] text-ink-dim transition-colors hover:text-acc"
        >
          &larr; Back to journal
        </Link>
      </div>

      <article className="pt-[clamp(40px,6vw,70px)]">
        <header className="narrow">
          {meta && (
            <FadeUp
              as="p"
              className="mb-[30px] font-mono text-[12.5px] uppercase tracking-[0.1em] text-acc"
            >
              {meta}
            </FadeUp>
          )}
          <Reveal
            as="h1"
            className="text-[clamp(34px,6vw,84px)] font-[700] leading-[1.02] tracking-[-0.035em]"
          >
            {post.title}
          </Reveal>
          {post.excerpt && (
            <FadeUp
              as="p"
              className="mt-7 max-w-[60ch] text-[clamp(18px,2vw,24px)] leading-[1.45] text-ink-dim"
            >
              {post.excerpt}
            </FadeUp>
          )}
        </header>

        {hasCover && (
          <div className="wrap mt-[clamp(40px,6vw,80px)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={urlForImage(post.coverImage as SanityImageSource)
                .width(1600)
                .fit("max")
                .url()}
              alt={post.title}
              className="w-full border border-line-2"
            />
          </div>
        )}

        <div className="narrow mt-[clamp(50px,7vw,90px)] pb-[clamp(40px,7vw,100px)]">
          <div className="max-w-[68ch] text-[clamp(17px,1.55vw,21px)] leading-[1.7] text-ink-dim">
            <PortableText value={post.body} />
          </div>
        </div>
      </article>

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

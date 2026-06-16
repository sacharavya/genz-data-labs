import {
  PortableText as PortableTextBase,
  type PortableTextComponents,
} from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import type { SanityImageSource } from "@sanity/image-url";
import { urlForImage } from "@/sanity/lib/image";

/**
 * Renders Portable Text with brand-consistent structure. Typography size/color
 * is set by the surrounding container so the same component serves small card
 * copy and large case-study prose. Bold maps to ink, italic to the serif.
 */
const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-6 last:mb-0">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-2 border-acc pl-7 font-serif text-ink italic">
        {children}
      </blockquote>
    ),
    h3: ({ children }) => (
      <h3 className="mb-4 mt-10 text-[clamp(22px,2.4vw,32px)] font-[680] tracking-[-0.02em] text-ink">
        {children}
      </h3>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-ink">{children}</strong>
    ),
    em: ({ children }) => <em className="font-serif italic">{children}</em>,
    link: ({ children, value }) => (
      <a
        href={(value as { href?: string })?.href}
        className="link-underline text-ink"
        target="_blank"
        rel="noreferrer"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-6 list-disc space-y-2 pl-5">{children}</ul>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
  },
  types: {
    image: ({ value }) => {
      const v = value as {
        asset?: { _ref?: string; url?: string };
        alt?: string;
      };
      if (!v.asset?._ref && !v.asset?.url) return null;
      const src = urlForImage(v as SanityImageSource)
        .width(1400)
        .fit("max")
        .url();
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={v.alt ?? ""}
          className="my-10 w-full border border-line-2"
        />
      );
    },
  },
};

export function PortableText({ value }: { value?: PortableTextBlock[] }) {
  if (!value || value.length === 0) return null;
  return <PortableTextBase value={value} components={components} />;
}

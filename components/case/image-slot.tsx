import type { SanityImageSource } from "@sanity/image-url";
import { urlForImage } from "@/sanity/lib/image";
import type { GalleryItem } from "@/lib/types";

/**
 * Renders an uploaded image, or a clearly-labeled placeholder slot when none is
 * set yet (so a partly-filled case like RP Nails degrades gracefully). Wide
 * items span the full row; square items sit two-up.
 */
export function ImageSlot({ item }: { item: GalleryItem }) {
  const hasImage = Boolean(item.image?.asset?._ref || item.image?.asset?.url);
  const aspect = item.layout === "square" ? "aspect-square" : "aspect-[16/9]";
  const colSpan = item.layout === "wide" ? "min-[680px]:col-span-2" : "";

  return (
    <figure className={colSpan}>
      <div
        className={`relative flex items-center justify-center overflow-hidden border border-line-2 [background:linear-gradient(135deg,#161616,#0E0E0E)] ${aspect}`}
      >
        {hasImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={urlForImage(item.image as SanityImageSource)
              .width(1400)
              .fit("max")
              .url()}
            alt={item.label ?? item.caption ?? ""}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="px-5 text-center font-mono text-[12px] uppercase leading-[1.8] tracking-[0.08em] text-ink-faint">
            <b className="font-medium text-ink-dim">Drop image</b>
            <br />
            {item.label}
          </span>
        )}
      </div>
      {hasImage && item.caption && (
        <figcaption className="mt-3 font-mono text-[11.5px] uppercase tracking-[0.05em] text-ink-faint">
          {item.caption}
        </figcaption>
      )}
    </figure>
  );
}

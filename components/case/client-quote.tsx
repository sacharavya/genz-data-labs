import { FadeUp } from "@/components/motion";
import type { ClientQuote } from "@/lib/types";

/** Highlights [bracketed] placeholder segments in lime, like the source slots. */
function renderQuote(text: string) {
  return text
    .split(/(\[[^\]]*\])/g)
    .filter(Boolean)
    .map((part, i) =>
      part.startsWith("[") ? (
        <span key={i} className="text-acc">
          {part}
        </span>
      ) : (
        <span key={i}>{part}</span>
      ),
    );
}

export function ClientQuoteBlock({ quote }: { quote?: ClientQuote }) {
  if (!quote || (!quote.quote && !quote.attribution)) return null;
  return (
    <section className="border-b border-line py-[clamp(70px,10vw,150px)] text-center">
      <div className="narrow">
        {quote.quote && (
          <FadeUp
            as="blockquote"
            className="mx-auto max-w-[20ch] font-serif text-[clamp(28px,4.6vw,68px)] italic leading-[1.12] tracking-[-0.01em]"
          >
            &ldquo;{renderQuote(quote.quote)}&rdquo;
          </FadeUp>
        )}
        {quote.attribution && (
          <FadeUp
            as="div"
            className="mt-9 font-mono text-[12.5px] uppercase tracking-[0.06em] text-ink-dim"
          >
            {quote.attribution}
          </FadeUp>
        )}
        {quote.note && (
          <FadeUp
            as="div"
            className="mt-3.5 font-mono text-[11px] tracking-[0.04em] text-ink-faint"
          >
            {quote.note}
          </FadeUp>
        )}
      </div>
    </section>
  );
}

import type { PortableTextBlock } from "@portabletext/types";

type Style = "normal" | "blockquote" | "h3";

interface Line {
  style: Style;
  text: string;
}

function spansFor(text: string, blockIndex: number) {
  // Split on **bold** segments, preserving order.
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter((p) => p.length > 0);
  return parts.map((part, si) => {
    const bold = part.startsWith("**") && part.endsWith("**");
    return {
      _type: "span" as const,
      _key: `s${blockIndex}_${si}`,
      text: bold ? part.slice(2, -2) : part,
      marks: bold ? ["strong"] : [],
    };
  });
}

function toBlocks(lines: Line[]): PortableTextBlock[] {
  return lines.map((line, bi) => ({
    _type: "block",
    _key: `b${bi}`,
    style: line.style,
    markDefs: [],
    children: spansFor(line.text, bi),
  })) as unknown as PortableTextBlock[];
}

/** Build Portable Text from plain strings. Use **double asterisks** for bold. */
export function pt(...texts: string[]): PortableTextBlock[] {
  return toBlocks(texts.map((text) => ({ style: "normal", text })));
}

/** Build a single normal block (handy for short card copy). */
export function ptLine(text: string): PortableTextBlock[] {
  return toBlocks([{ style: "normal", text }]);
}

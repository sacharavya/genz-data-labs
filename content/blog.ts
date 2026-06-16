import type { BlogPost } from "@/lib/types";
import { pt } from "./portable-text";

/**
 * One starter post so the /blog routes render real content out of the box.
 * Safe to delete in the Studio once the team writes their own.
 */
export const blogPosts: BlogPost[] = [
  {
    _id: "blogPost.why-we-build-organic-first",
    title: "Why we build organic-first",
    slug: "why-we-build-organic-first",
    excerpt:
      "Paid ads rent attention. Search, content, and reputation compound. Here is how we think about the difference, and why we open every engagement with an audit instead of an ad account.",
    author: "genz technologies",
    publishedAt: "2026-06-01T09:00:00.000Z",
    body: pt(
      "Paid ads are a tap somebody else controls. The moment you stop paying, the traffic stops with it. That is fine for a launch spike. It is a bad foundation for a business.",
      "Organic growth works the other way. **A page that ranks keeps ranking while you sleep. An audience keeps buying. Reviews keep arriving.** These are assets you own, and they compound month over month instead of resetting to zero with every invoice.",
      "So we open every engagement the same way: a scored audit, not an ad account. We map where the demand already is, find the highest-leverage gaps, and ship in priority order. It is slower than buying reach. It is also yours forever.",
      "That is the entire thesis. Traffic you earn, not traffic you rent.",
    ),
  },
];

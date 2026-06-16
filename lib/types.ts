import type { PortableTextBlock } from "@portabletext/types";

export type RichText = PortableTextBlock[];

/** A Sanity image reference, or null when a slot has no upload yet. */
export interface CMSImage {
  asset?: { _ref?: string; url?: string };
  alt?: string;
  hotspot?: { x: number; y: number };
}

export interface SubStat {
  label?: string;
  value: string;
}

export interface CaseCard {
  problem?: RichText;
  result?: string;
  metricNumber?: string;
  metricUnit?: string;
  metricLabel?: string;
  subStats?: SubStat[];
  footer?: string;
}

export interface StatBandItem {
  number?: string;
  prefix?: string;
  unit?: string;
  label?: string;
  footnote?: string;
}

export interface MetaStripItem {
  label?: string;
  value?: string;
}

export interface BuildItem {
  number?: string;
  heading?: string;
  body?: string;
}

export interface GalleryItem {
  image?: CMSImage | null;
  label?: string;
  caption?: string;
  layout?: "wide" | "square";
}

export interface ClientQuote {
  quote?: string;
  attribution?: string;
  note?: string;
}

export interface TodoSlot {
  title?: string;
  intro?: string;
  items?: string[];
  outro?: string;
}

export interface CaseStudy {
  _id?: string;
  title: string;
  clientName: string;
  slug: string;
  caseNumber?: string;
  sector?: string;
  location?: string;
  scope?: string;
  status?: string;
  order: number;
  featured?: boolean;
  hasCasePage?: boolean;
  heroSubtitle?: string;
  heroImage?: CMSImage | null;
  metaStrip?: MetaStripItem[];
  card?: CaseCard;
  statBand?: StatBandItem[];
  problem?: RichText;
  approach?: RichText;
  buildTag?: string;
  buildHeading?: string;
  buildHeadingAccent?: string;
  buildList?: BuildItem[];
  techChips?: string[];
  resultPullQuote?: string;
  resultBody?: RichText;
  resultSlot?: string;
  clientQuote?: ClientQuote;
  todoSlot?: TodoSlot;
  gallery?: GalleryItem[];
  ctaEyebrow?: string;
  ctaHeading?: string;
  ctaAccent?: string;
}

export interface PricingItem {
  name: string;
  description?: string;
  monthlyPrice: number;
  defaultOn?: boolean;
}

export interface MainStat {
  number?: string;
  prefix?: string;
  unit?: string;
  label?: string;
}

export interface City {
  name: string;
  code?: string;
  tag?: string;
}

export interface SiteSettings {
  availabilityTag?: string;
  contactEmail?: string;
  cities?: City[];
  statsBand?: MainStat[];
  pricingCurrency?: string;
  pricingNote?: string;
  pricing?: PricingItem[];
}

export interface BlogPost {
  _id?: string;
  title: string;
  slug: string;
  excerpt?: string;
  coverImage?: CMSImage | null;
  author?: string;
  publishedAt: string;
  body?: RichText;
}

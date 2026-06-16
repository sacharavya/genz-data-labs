import type { SiteSettings } from "@/lib/types";

/**
 * Main-page values the team can edit without a deploy. Ported from the HTML,
 * except the pricing line items, which the original design did not include:
 * the prices below are reasonable editable defaults to confirm in the Studio.
 */
export const siteSettings: SiteSettings = {
  availabilityTag: "Taking 2 clients for Q3 2026",
  contactEmail: "info@genzdatasolutions.com",
  cities: [
    { name: "Toronto", code: "CA", tag: "TOR" },
    { name: "Dubai", code: "AE", tag: "DXB" },
    { name: "Kathmandu", code: "NP", tag: "KTM" },
  ],
  statsBand: [
    { number: "80", unit: "K+", label: "Followers grown for one brand, zero ad spend" },
    { number: "0", prefix: "$", label: "Ad budget across every client engagement" },
    { number: "3", label: "Cities: Toronto, Dubai, Kathmandu" },
    { number: "100", unit: "%", label: "Organic-first, measured every month" },
  ],
  pricingCurrency: "CAD",
  pricingNote:
    "Estimated monthly retainer in CAD. Final scope and price are confirmed after a free audit.",
  pricing: [
    {
      name: "SEO & Local Search",
      description: "GBP optimization, technical SEO, and local content from scored audits.",
      monthlyPrice: 1200,
      defaultOn: true,
    },
    {
      name: "Social & Content",
      description: "Platform strategy and the content system behind organic audience growth.",
      monthlyPrice: 1500,
      defaultOn: true,
    },
    {
      name: "Video & Creative",
      description: "Short-form video and brand assets produced in-house, iterated on performance.",
      monthlyPrice: 1000,
      defaultOn: false,
    },
    {
      name: "Web & Software",
      description: "Sites, CRMs, and booking systems built to rank and convert.",
      monthlyPrice: 1800,
      defaultOn: false,
    },
    {
      name: "Analytics & Reporting",
      description: "A scored baseline and plain-language reporting every month.",
      monthlyPrice: 600,
      defaultOn: true,
    },
  ],
};

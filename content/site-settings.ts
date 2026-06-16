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
  pricingCurrency: "USD",
  pricingNote:
    "Minimum retainer period: 6 months · All figures in US dollars",
  pricing: [
    {
      name: "Google Business Profile management",
      description: "Weekly posts, fresh photos, review pipeline, full optimization",
      monthlyPrice: 200,
      defaultOn: true,
    },
    {
      name: "Local SEO upkeep",
      description: "On-page work, listing and directory consistency, ranking maintenance",
      monthlyPrice: 150,
      defaultOn: true,
    },
    {
      name: "Content strategy",
      description: "Editorial direction plus 2 SEO-optimized blog posts per month that capture people researching before they book",
      monthlyPrice: 200,
      defaultOn: true,
    },
    {
      name: "Social media management",
      description: "Every platform, not just the usual three. We find where your audience actually hangs out and build there: strategy, filming guidance, captions, scheduling, posting",
      monthlyPrice: 400,
      defaultOn: true,
    },
    {
      name: "Video editing",
      description: "Up to 8 finished short vertical videos per month",
      monthlyPrice: 350,
      defaultOn: true,
    },
    {
      name: "Graphic design",
      description: "Social posts, promos, in-store QR review cards, brand assets",
      monthlyPrice: 125,
      defaultOn: true,
    },
    {
      name: "Monthly reporting",
      description: "Plain-language report on reviews, rankings, growth, and bookings",
      monthlyPrice: 75,
      defaultOn: true,
    },
    {
      name: "Paid ads management",
      description: "Optional, and off by default: we prioritize organic growth over ads. Added only once your base is strong. Ad spend is paid by you, directly to the platforms, never hidden in our invoice",
      monthlyPrice: 300,
      defaultOn: false,
    },
  ],
};

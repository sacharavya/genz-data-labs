import type { CaseStudy } from "@/lib/types";
import { pt } from "./portable-text";

/**
 * Seed content ported from the original static HTML. Used directly as the
 * local fallback, and imported into Sanity by `npm run seed`. Edit cases in the
 * Studio once a project is connected; this file is just the starting point.
 */
export const caseStudies: CaseStudy[] = [
  // ---------------------------------------------------------------- CRF Parfums
  {
    _id: "caseStudy.crf-parfums",
    title: "CRF Parfums",
    clientName: "CRF Parfums",
    slug: "crf-parfums",
    caseNumber: "CASE 01",
    sector: "Fragrance & lifestyle",
    location: "Dubai",
    scope: "Content + Brand",
    order: 1,
    featured: true,
    hasCasePage: false,
    card: {
      problem: pt(
        "A fragrance brand stalled on the algorithm. The obvious move was to buy reach. **Instead we engineered content against retention data:** hooks, posting windows tuned to the Gulf and South Asia, formats killed or doubled weekly on the numbers.",
      ),
      result:
        "An audience that doesn't just watch. It buys. The page became the launch platform for a five-scent line.",
      metricNumber: "80",
      metricUnit: "K+",
      metricLabel: "Followers grown, zero paid spend",
      subStats: [
        { label: "Ad spend", value: "$0" },
        { label: "Now", value: "83K+" },
      ],
      footer: "@crazyfragrance_ → crfparfums.com",
    },
  },

  // ----------------------------------------------------- Big Bang Immigration
  {
    _id: "caseStudy.big-bang-immigration",
    title: "Big Bang Immigration",
    clientName: "Big Bang Immigration",
    slug: "big-bang-immigration",
    caseNumber: "CASE 02",
    sector: "Regulated services",
    location: "Toronto",
    scope: "Custom software",
    status: "Live in production, in daily use",
    order: 2,
    featured: true,
    hasCasePage: true,
    heroSubtitle:
      "How a licensed immigration practice moved from paper, spreadsheets, and memory to a custom case-management platform its staff use every single day, built compliant from the first line.",
    metaStrip: [
      { label: "Client", value: "Big Bang Immigration Consulting, an RCIC-licensed firm" },
      { label: "Scope", value: "Product design + full-stack build + security" },
      { label: "Sector", value: "Immigration services, regulated" },
      { label: "Status", value: "Live in production, in daily use" },
    ],
    statBand: [
      { number: "0", unit: "→1", label: "Custom platform, designed and shipped from zero" },
      { number: "100", unit: "%", label: "Client data held in Canada, compliant by design" },
      {
        number: "Daily",
        label: "In active use by the whole practice",
        footnote:
          "// Replace with a hard number after firm sign-off: e.g. hours saved per week, faster onboarding",
      },
    ],
    problem: pt(
      "Big Bang is a licensed immigration consultancy handling real clients, real deadlines, and **some of the most sensitive personal data a business can hold**: passports, financial records, family histories.",
      "But the practice ran on a patchwork. Intake lived on paper and in spreadsheets. Appointments were arranged across email threads. The true status of any given case lived mostly in the consultant's memory.",
      "That works until it doesn't. It does not scale, it is fragile when someone is away, and for a regulated firm it carries real compliance risk every single day.",
    ),
    approach: pt(
      "We did not buy a generic CRM and bend the firm around it. **We designed and built a custom platform around how the practice actually works.**",
      "Because immigration files are regulated, compliance was not a feature bolted on at the end. It was the first requirement, shaping every table, every permission, and where every byte of data lives.",
      "We opened with the same discipline we bring to every engagement: map the real workflow, find the highest-risk friction, and ship in priority order rather than all at once.",
    ),
    gallery: [
      { label: "Big Bang CRM dashboard, client names blurred", layout: "wide" },
    ],
    buildTag: "(02) What we built",
    buildHeading: "A practice that ran on paper now runs on",
    buildHeadingAccent: "one platform.",
    buildList: [
      {
        number: "01",
        heading: "Digital client intake",
        body: "Structured intake that captures everything a file needs once, cleanly, instead of scattered forms and re-keyed data.",
      },
      {
        number: "02",
        heading: "Case tracking with full history",
        body: "Every case has a single source of truth: status, documents, and timeline visible to the whole practice, not locked in one person's head.",
      },
      {
        number: "03",
        heading: "A real booking calendar",
        body: "Weekly availability that clients book against directly, removing the email back-and-forth that used to schedule every appointment.",
      },
      {
        number: "04",
        heading: "Auto-generated Teams meetings",
        body: "Microsoft Teams links create themselves the moment an appointment is booked. Zero manual steps, zero copy-paste, zero missed links.",
      },
      {
        number: "05",
        heading: "Compliance, built in",
        body: "Row-level security on every table and all data hosted in a Canadian region, aligned to PIPEDA and CICC obligations from day one.",
      },
    ],
    techChips: [
      "Next.js",
      "Supabase",
      "Microsoft Graph",
      "Row-level security",
      "Canadian hosting",
      "Security audit",
    ],
    resultPullQuote:
      "The metric we care about most is the simplest one: they actually use it. Every day.",
    resultBody: pt(
      "Internal tools have a way of dying in a drawer. Staff nod politely, then quietly go back to the spreadsheet. **The real test of a build like this is not launch day, it is week twelve.**",
      "Big Bang's platform passed that test. It became the daily operating system of the practice: intake, cases, bookings, and meetings all running through one place instead of four. The consultant's memory is no longer the database.",
      "For a regulated firm, that is not just convenience. It is a defensible, auditable way of handling sensitive data that the old patchwork could never offer.",
    ),
    clientQuote: {
      quote:
        "[Client quote slot.] One or two lines from the firm on what changed day to day.",
      attribution: "Name, role / Big Bang Immigration Consulting",
      note: "// Ask the firm for one sentence: what is easier now than before? Approve before publishing.",
    },
    card: {
      problem: pt(
        "A licensed immigration firm ran on paper, spreadsheets, and memory. We designed and built a custom case-management platform from zero: **digital intake, case tracking, a real booking calendar, auto-generated Teams meetings.**",
      ),
      result:
        "A practice that ran on paper now runs on one platform. Staff use it every single day.",
      metricNumber: "100",
      metricUnit: "%",
      metricLabel: "Canadian data residency, compliant by design",
      subStats: [
        { label: "Manual →", value: "digital" },
        { label: "In daily", value: "use" },
      ],
    },
    ctaEyebrow: "Your turn",
    ctaHeading: "Built on paper? Let's fix",
    ctaAccent: "that.",
  },

  // ----------------------------------------------------------------- RP Nails
  {
    _id: "caseStudy.rp-nails",
    title: "RP Nails",
    clientName: "RP Nails",
    slug: "rp-nails",
    caseNumber: "CASE 03",
    sector: "Beauty",
    location: "Toronto",
    scope: "Organic + Local SEO",
    status: "Active monthly retainer",
    order: 3,
    featured: true,
    hasCasePage: true,
    heroSubtitle:
      "Great work, invisible online. How we built a local growth engine on channels the salon owns outright, with zero dollars of ad spend.",
    metaStrip: [
      { label: "Client", value: "RP Nails, Queens Quay, Toronto" },
      { label: "Scope", value: "Local SEO + reviews + content + retainer" },
      { label: "Sector", value: "Beauty, local service" },
      { label: "Status", value: "Active monthly retainer" },
    ],
    statBand: [
      { number: "0", prefix: "$", label: "Ad spend required, earned and owned channels only" },
      { number: "5", label: "Phase organic blueprint, baseline to retention" },
      {
        number: "__",
        unit: "%",
        label: "// Headline outcome from your docs goes here",
        footnote:
          "// e.g. profile views, calls, bookings, or review-count lift vs baseline",
      },
    ],
    todoSlot: {
      title: "⚑ Send these and this page goes live with real proof",
      intro:
        "This case is scaffolded in the brand's voice and ready. To turn it from a strong story into hard evidence, drop me any of:",
      items: [
        "Google Business Profile screenshots: before vs now (profile views, calls, direction requests, search terms)",
        "Review count and average rating at start vs today",
        "Any ranking movement for target searches (nail salon Queens Quay, pedicure downtown Toronto)",
        "2 to 4 photos: the salon, nail work, or QR review cards in situ",
        "One sentence from the owner on what has changed",
        "The signed proposal or blueprint doc if you want me to mirror exact phase names",
      ],
      outro:
        "Anything missing stays as a clearly marked slot so nothing fake ships.",
    },
    problem: pt(
      "RP Nails does beautiful work on Queens Quay, and their regulars know it. **The problem was everyone else.**",
      'Nobody searching "nail salon near me" could find them. The Google Business Profile was thin, the website was slow, and there was no system turning happy clients into reviews or repeat bookings. Demand was real but invisible to the people most likely to book.',
    ),
    approach: pt(
      "An agency would have sold them Instagram ads on day one. **We opened with a diagnostic instead.**",
      "A line-by-line audit of the Google profile and website, scoring everything from listing completeness and review handling to page speed and how many taps it takes to actually book. The findings became a five-phase blueprint, built entirely on channels the salon owns, so the results stay theirs.",
    ),
    gallery: [
      { label: "GBP before", layout: "square" },
      { label: "GBP after", layout: "square" },
    ],
    buildTag: "(02) The blueprint",
    buildHeading: "Five phases, built on what the salon",
    buildHeadingAccent: "owns.",
    buildList: [
      {
        number: "P1",
        heading: "Baseline & profile",
        body: "Full Google Business Profile optimization, fixing every inconsistency in name, address, phone, and hours across the web, and scoring a baseline to measure everything against.",
      },
      {
        number: "P2",
        heading: "Local search",
        body: "On-page and local SEO so the salon ranks for the searches that actually bring booking-ready customers, not vanity keywords.",
      },
      {
        number: "P3",
        heading: "Reviews engine",
        body: "A simple in-salon system, including QR review cards, to turn satisfied clients into a steady stream of new reviews, with professional responses to every one.",
      },
      {
        number: "P4",
        heading: "Content & funnel",
        body: "Consistent content across the platforms the audience actually uses, connected to a clean path from discovery to booking.",
      },
      {
        number: "P5",
        heading: "Retention",
        body: "Systems that bring existing clients back, because the cheapest booking is the one from a customer you already have.",
      },
    ],
    resultPullQuote:
      "Local marketing compounds. Reviews, ranking, and audience build on each other.",
    resultBody: pt(
      "The salon is on a monthly retainer now, working through the phases, with **every month reported against the original audit baseline.** When the numbers move, both sides know exactly why.",
    ),
    resultSlot:
      "Once you send the GBP data, this becomes the hardest-hitting part of the page: the real lift in profile views, calls, bookings, or reviews against the starting baseline. That single number is what turns a prospect into an email.",
    clientQuote: {
      quote:
        "[Owner quote slot.] One or two lines on what changed since the work began.",
      attribution: "Owner, RP Nails",
      note: "// Approve wording with the owner before publishing.",
    },
    card: {
      problem: pt(
        "Great work, invisible online. Most agencies would have sold ads on day one. **We opened with a line-by-line audit** of the Google profile and website, then built a five-phase blueprint on channels the salon owns outright.",
      ),
      result:
        "Local search that compounds. A retainer measured against a real baseline, not a vanity dashboard.",
      metricNumber: "0",
      metricLabel: "Dollars of ad spend required",
      subStats: [
        { label: "Reviews", value: "10 to 20/mo" },
        { value: "5-phase plan" },
      ],
    },
    ctaEyebrow: "Your turn",
    ctaHeading: "Invisible on Google? Let's",
    ctaAccent: "fix it.",
  },
];

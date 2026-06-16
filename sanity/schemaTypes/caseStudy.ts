import { defineType, defineField, defineArrayMember } from "sanity";

/**
 * caseStudy supports both a complete case (Big Bang) and one with graceful
 * empty slots (RP Nails). Empty optional fields are simply hidden by the
 * front end rather than breaking the layout.
 */
export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case study",
  type: "document",
  groups: [
    { name: "overview", title: "Overview", default: true },
    { name: "card", title: "Main-page card" },
    { name: "hero", title: "Hero + stats" },
    { name: "body", title: "Body" },
    { name: "media", title: "Images" },
    { name: "cta", title: "CTA" },
  ],
  fields: [
    // ---- overview ----
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "overview",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "clientName",
      title: "Client name",
      type: "string",
      group: "overview",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "overview",
      options: { source: "clientName", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "sector", title: "Sector", type: "string", group: "overview" }),
    defineField({ name: "location", title: "Location", type: "string", group: "overview" }),
    defineField({ name: "scope", title: "Scope", type: "string", group: "overview" }),
    defineField({ name: "status", title: "Status", type: "string", group: "overview" }),
    defineField({
      name: "order",
      title: "Order (main page)",
      type: "number",
      group: "overview",
      description: "Lower numbers appear first in the Selected Work section.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "featured",
      title: "Featured on main page",
      type: "boolean",
      group: "overview",
      initialValue: true,
    }),
    defineField({
      name: "hasCasePage",
      title: "Has a full case study page",
      type: "boolean",
      group: "overview",
      description:
        "When off, the main-page card shows but does not link to a /work page (e.g. CRF Parfums).",
      initialValue: true,
    }),
    defineField({
      name: "caseNumber",
      title: "Case number label",
      type: "string",
      group: "overview",
      description: 'Shown on the card and hero, e.g. "CASE 01".',
    }),

    // ---- main-page card ----
    defineField({
      name: "card",
      title: "Main-page card",
      type: "object",
      group: "card",
      description: "The condensed version shown in the Selected Work section.",
      fields: [
        defineField({ name: "problem", title: "Problem (short)", type: "blockContent" }),
        defineField({ name: "result", title: "Result line (serif)", type: "text", rows: 2 }),
        defineField({ name: "metricNumber", title: "Metric number", type: "string", description: 'Numbers animate (e.g. "80"); text shows as-is.' }),
        defineField({ name: "metricUnit", title: "Metric unit", type: "string", description: 'e.g. "K+", "%"' }),
        defineField({ name: "metricLabel", title: "Metric label", type: "string" }),
        defineField({
          name: "subStats",
          title: "Sub stats",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({ name: "label", title: "Label", type: "string" }),
                defineField({ name: "value", title: "Value", type: "string" }),
              ],
              preview: {
                select: { title: "value", subtitle: "label" },
              },
            }),
          ],
        }),
        defineField({
          name: "footer",
          title: "Footer text",
          type: "string",
          description:
            'For cases without a page, e.g. "@crazyfragrance_ -> crfparfums.com". Cases with a page show "Read the case study" automatically.',
        }),
      ],
    }),

    // ---- hero + stat band ----
    defineField({
      name: "heroSubtitle",
      title: "Hero subtitle",
      type: "text",
      group: "hero",
      rows: 3,
    }),
    defineField({
      name: "metaStrip",
      title: "Hero metadata strip",
      type: "array",
      group: "hero",
      description: "Labeled cells under the case study hero (Client, Scope, Sector, Status).",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "value", title: "Value", type: "string" }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        }),
      ],
    }),
    defineField({
      name: "statBand",
      title: "Stat band",
      type: "array",
      group: "hero",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "number", title: "Number", type: "string", description: 'Numeric values animate; text like "Daily" or "__" shows as-is.' }),
            defineField({ name: "prefix", title: "Prefix", type: "string", description: 'e.g. "$"' }),
            defineField({ name: "unit", title: "Unit", type: "string", description: 'e.g. "%", "K+", "->1"' }),
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "footnote", title: "Footnote", type: "string" }),
          ],
          preview: { select: { title: "number", subtitle: "label" } },
        }),
      ],
    }),

    // ---- body ----
    defineField({ name: "problem", title: "Problem", type: "blockContent", group: "body" }),
    defineField({ name: "approach", title: "Approach", type: "blockContent", group: "body" }),
    defineField({
      name: "buildTag",
      title: 'Build section tag',
      type: "string",
      group: "body",
      description: 'e.g. "(02) What we built" or "(02) The blueprint"',
    }),
    defineField({ name: "buildHeading", title: "Build section heading", type: "string", group: "body" }),
    defineField({ name: "buildHeadingAccent", title: "Build heading accent (serif)", type: "string", group: "body" }),
    defineField({
      name: "buildList",
      title: "Build list / blueprint",
      type: "array",
      group: "body",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "number", title: "Number", type: "string", description: 'e.g. "01" or "P1"' }),
            defineField({ name: "heading", title: "Heading", type: "string" }),
            defineField({ name: "body", title: "Body", type: "text", rows: 3 }),
          ],
          preview: { select: { title: "heading", subtitle: "number" } },
        }),
      ],
    }),
    defineField({
      name: "techChips",
      title: "Tech chips",
      type: "array",
      group: "body",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
    defineField({ name: "resultPullQuote", title: "Result pull quote (serif)", type: "text", rows: 2, group: "body" }),
    defineField({ name: "resultBody", title: "Result body", type: "blockContent", group: "body" }),
    defineField({
      name: "resultSlot",
      title: "Result slot (fill from docs)",
      type: "text",
      rows: 3,
      group: "body",
      description: "Optional dashed callout shown in the result section while data is pending.",
    }),
    defineField({
      name: "clientQuote",
      title: "Client quote",
      type: "object",
      group: "body",
      fields: [
        defineField({ name: "quote", title: "Quote", type: "text", rows: 3 }),
        defineField({ name: "attribution", title: "Attribution", type: "string" }),
        defineField({ name: "note", title: "Editorial note", type: "string", description: "Internal reminder shown until the quote is approved." }),
      ],
    }),
    defineField({
      name: "todoSlot",
      title: "To-finish-this-page slot",
      type: "object",
      group: "body",
      description: 'Optional "(00)" section listing what is still needed to complete the page.',
      fields: [
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({ name: "intro", title: "Intro", type: "text", rows: 2 }),
        defineField({ name: "items", title: "Items", type: "array", of: [defineArrayMember({ type: "string" })] }),
        defineField({ name: "outro", title: "Outro", type: "text", rows: 2 }),
      ],
    }),

    // ---- media ----
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "image",
      group: "media",
      options: { hotspot: true },
    }),
    defineField({
      name: "gallery",
      title: "Captioned images / slots",
      type: "array",
      group: "media",
      description:
        "Each entry shows an uploaded image, or a labeled placeholder slot if no image is set yet.",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
            defineField({ name: "label", title: "Slot label", type: "string", description: "Shown when no image is uploaded, and as a fallback alt text." }),
            defineField({ name: "caption", title: "Caption", type: "string" }),
            defineField({
              name: "layout",
              title: "Layout",
              type: "string",
              options: { list: [
                { title: "Wide (16:9)", value: "wide" },
                { title: "Square", value: "square" },
              ] },
              initialValue: "wide",
            }),
          ],
          preview: { select: { title: "label", subtitle: "caption", media: "image" } },
        }),
      ],
    }),

    // ---- cta ----
    defineField({ name: "ctaEyebrow", title: "CTA eyebrow", type: "string", group: "cta", initialValue: "Your turn" }),
    defineField({ name: "ctaHeading", title: "CTA heading", type: "string", group: "cta" }),
    defineField({ name: "ctaAccent", title: "CTA heading accent (serif)", type: "string", group: "cta" }),
  ],
  orderings: [
    { title: "Main-page order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "clientName", subtitle: "sector", media: "heroImage" },
  },
});

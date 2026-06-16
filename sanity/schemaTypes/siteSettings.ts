import { defineType, defineField, defineArrayMember } from "sanity";

/**
 * Singleton: the handful of main-page values the team can change without a
 * deploy (availability tag, stats numbers, pricing line items, contact, cities).
 * Brand identity (hero headline, manifesto, layout, motion) stays in code.
 */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  groups: [
    { name: "general", title: "General", default: true },
    { name: "stats", title: "Stats band" },
    { name: "pricing", title: "Pricing" },
  ],
  fields: [
    defineField({
      name: "availabilityTag",
      title: "Availability tag",
      type: "string",
      group: "general",
      description: 'Shown in the hero, e.g. "Taking 2 clients for Q3 2026".',
    }),
    defineField({
      name: "contactEmail",
      title: "Contact email",
      type: "string",
      group: "general",
      validation: (r) => r.email(),
    }),
    defineField({
      name: "cities",
      title: "Cities",
      type: "array",
      group: "general",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "name", title: "Name", type: "string" }),
            defineField({ name: "code", title: "Country code", type: "string", description: 'e.g. "CA"' }),
            defineField({ name: "tag", title: "Airport tag", type: "string", description: 'e.g. "TOR" (header strip)' }),
          ],
          preview: { select: { title: "name", subtitle: "tag" } },
        }),
      ],
    }),
    defineField({
      name: "statsBand",
      title: "Stats band (main page)",
      type: "array",
      group: "stats",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "number", title: "Number", type: "string", description: "Numeric values animate; text shows as-is." }),
            defineField({ name: "prefix", title: "Prefix", type: "string", description: 'e.g. "$"' }),
            defineField({ name: "unit", title: "Unit", type: "string", description: 'e.g. "K+", "%"' }),
            defineField({ name: "label", title: "Label", type: "string" }),
          ],
          preview: { select: { title: "number", subtitle: "label" } },
        }),
      ],
    }),
    defineField({
      name: "pricingCurrency",
      title: "Pricing currency",
      type: "string",
      group: "pricing",
      initialValue: "CAD",
    }),
    defineField({
      name: "pricingNote",
      title: "Pricing note",
      type: "string",
      group: "pricing",
      description: "Small print under the pricing total.",
    }),
    defineField({
      name: "pricing",
      title: "Pricing line items",
      type: "array",
      group: "pricing",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "name", title: "Service name", type: "string", validation: (r) => r.required() }),
            defineField({ name: "description", title: "Description", type: "string" }),
            defineField({ name: "monthlyPrice", title: "Monthly price", type: "number", validation: (r) => r.required().min(0) }),
            defineField({ name: "defaultOn", title: "Checked by default", type: "boolean", initialValue: true }),
          ],
          preview: {
            select: { title: "name", subtitle: "monthlyPrice" },
            prepare: ({ title, subtitle }) => ({ title, subtitle: subtitle != null ? `${subtitle}/mo` : "" }),
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site settings" }),
  },
});

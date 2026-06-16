/**
 * Brand constants. These are identity-level values that rarely change and must
 * not be breakable by editors, so they live in code (not the CMS). The CMS
 * overrides a few of these at runtime (availability tag, contact email) once
 * Sanity is wired; the values here are the safe defaults / source of truth for
 * the static shell.
 */
export const SITE = {
  name: "genz technologies",
  email: "info@genzdatasolutions.com",
  availability: "Taking 2 clients for Q3 2026",
  positioning: "traffic you earn, not traffic you rent",
  cities: [
    { name: "Toronto", code: "CA", tag: "TOR" },
    { name: "Dubai", code: "AE", tag: "DXB" },
    { name: "Kathmandu", code: "NP", tag: "KTM" },
  ],
  /** Header city strip, e.g. "TOR / DXB / KTM" */
  get cityTags() {
    return this.cities.map((c) => c.tag).join(" / ");
  },
} as const;

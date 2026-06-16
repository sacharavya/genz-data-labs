import type { StructureResolver } from "sanity/structure";

/** siteSettings is a singleton; case studies and blog posts are normal lists. */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site settings")
        .id("siteSettings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings"),
        ),
      S.divider(),
      S.documentTypeListItem("caseStudy").title("Case studies"),
      S.documentTypeListItem("blogPost").title("Blog posts"),
    ]);

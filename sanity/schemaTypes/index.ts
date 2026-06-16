import type { SchemaTypeDefinition } from "sanity";
import { blockContent } from "./blockContent";
import { caseStudy } from "./caseStudy";
import { blogPost } from "./blogPost";
import { siteSettings } from "./siteSettings";

export const schemaTypes = [caseStudy, blogPost, siteSettings, blockContent];

export const schema: { types: SchemaTypeDefinition[] } = {
  types: schemaTypes,
};

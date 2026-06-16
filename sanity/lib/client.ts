import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

/**
 * Read client. Uses a syntactically valid placeholder project id when none is
 * configured so imports never throw; callers gate real fetches on
 * `isSanityConfigured` (see lib/content.ts).
 */
export const client = createClient({
  projectId: projectId || "placeholder",
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
});

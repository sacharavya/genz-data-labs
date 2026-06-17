import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

/**
 * Read client. This module is only imported on the server (via lib/content.ts,
 * which is `server-only`), so the token is never sent to the browser.
 *
 * When a server token is present we read from the live API (the public CDN can
 * lag right after writes, and a freshly created public dataset can take a while
 * to serve unauthenticated reads). With no token we fall back to the public CDN.
 */
const token =
  process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_WRITE_TOKEN;

export const client = createClient({
  projectId: projectId || "placeholder",
  dataset,
  apiVersion,
  useCdn: !token,
  perspective: "published",
  token: token || undefined,
});

/**
 * Sanity environment configuration. Nothing here throws when unset: if no
 * project id is provided, `isSanityConfigured` is false and the app falls back
 * to the local seed content (see lib/content.ts) so the site renders out of the
 * box. Set the env vars (see .env.example) to switch to the live CMS.
 */
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

/** True once a real Sanity project id is configured. */
export const isSanityConfigured = projectId.trim().length > 0;

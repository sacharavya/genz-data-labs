/**
 * Seed / migration: imports the local seed content (the ported Big Bang, RP
 * Nails, and CRF Parfums cases, the site settings, and the starter blog post)
 * into Sanity as documents, so the live site renders from the CMS.
 *
 *   npm run seed           import into Sanity via the API (needs a write token)
 *   npm run seed:ndjson    write sanity/seed.ndjson for `sanity dataset import`
 *
 * Re-running is safe: documents use stable ids and are created-or-replaced.
 */
import { writeFileSync } from "node:fs";
import { createClient } from "@sanity/client";
import { caseStudies } from "../content/case-studies";
import { siteSettings } from "../content/site-settings";
import { blogPosts } from "../content/blog";

// Load env from .env.local if present (Node 21+).
try {
  process.loadEnvFile(".env.local");
} catch {
  // fall back to whatever is already in the environment
}

type Json = Record<string, unknown>;

/** Recursively add a stable `_key` to every object inside an array (Sanity
 *  requires it). Primitive array items and existing keys are left untouched. */
function addKeys(value: unknown, path = "k"): unknown {
  if (Array.isArray(value)) {
    return value.map((item, i) => {
      if (item && typeof item === "object") {
        const keyed = addKeys(item, `${path}_${i}`) as Json;
        return keyed._key ? keyed : { ...keyed, _key: `${path}_${i}` };
      }
      return item;
    });
  }
  if (value && typeof value === "object") {
    const out: Json = {};
    for (const [k, v] of Object.entries(value as Json)) {
      out[k] = addKeys(v, `${path}_${k}`);
    }
    return out;
  }
  return value;
}

function buildDocuments(): Json[] {
  const docs: Json[] = [];

  for (const cs of caseStudies) {
    const { _id, slug, ...rest } = cs;
    docs.push(
      addKeys({
        ...rest,
        _id: _id ?? `caseStudy.${slug}`,
        _type: "caseStudy",
        slug: { _type: "slug", current: slug },
      }) as Json,
    );
  }

  docs.push(
    addKeys({
      ...siteSettings,
      _id: "siteSettings",
      _type: "siteSettings",
    }) as Json,
  );

  for (const post of blogPosts) {
    const { _id, slug, ...rest } = post;
    docs.push(
      addKeys({
        ...rest,
        _id: _id ?? `blogPost.${slug}`,
        _type: "blogPost",
        slug: { _type: "slug", current: slug },
      }) as Json,
    );
  }

  return docs;
}

async function main() {
  const docs = buildDocuments();

  if (process.argv.includes("--ndjson")) {
    const path = "sanity/seed.ndjson";
    writeFileSync(path, docs.map((d) => JSON.stringify(d)).join("\n") + "\n");
    console.log(
      `Wrote ${docs.length} documents to ${path}\n` +
        `Import with: npx sanity dataset import ${path} <dataset> --replace`,
    );
    return;
  }

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
  const token = process.env.SANITY_API_WRITE_TOKEN;

  if (!projectId) {
    throw new Error(
      "NEXT_PUBLIC_SANITY_PROJECT_ID is not set. Add it to .env.local (see .env.example).",
    );
  }
  if (!token) {
    throw new Error(
      "SANITY_API_WRITE_TOKEN is not set. Create an Editor token at sanity.io/manage and add it to .env.local.",
    );
  }

  const client = createClient({
    projectId,
    dataset,
    apiVersion: "2024-10-01",
    token,
    useCdn: false,
  });

  const tx = client.transaction();
  for (const doc of docs) {
    tx.createOrReplace(doc as Json & { _id: string; _type: string });
  }
  await tx.commit();

  console.log(
    `Seeded ${docs.length} documents into Sanity project ${projectId} (dataset: ${dataset}).`,
  );
  for (const doc of docs) {
    console.log(`  - ${doc._type}: ${doc._id}`);
  }
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});

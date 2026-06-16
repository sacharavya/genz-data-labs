import "server-only";
import { client } from "@/sanity/lib/client";
import { isSanityConfigured } from "@/sanity/env";
import * as q from "@/sanity/lib/queries";
import { caseStudies as seedCaseStudies } from "@/content/case-studies";
import { siteSettings as seedSiteSettings } from "@/content/site-settings";
import { blogPosts as seedBlogPosts } from "@/content/blog";
import type { BlogPost, CaseStudy, SiteSettings } from "@/lib/types";

/**
 * Content access layer. When a Sanity project is configured we read from the
 * CMS; otherwise we serve the local seed so the site renders out of the box.
 * (Run `npm run seed` after connecting a project to populate it.)
 */

async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
): Promise<T> {
  return client.fetch<T>(query, params, {
    next: { revalidate: 60, tags: ["sanity"] },
  });
}

export async function getFeaturedCaseStudies(): Promise<CaseStudy[]> {
  if (isSanityConfigured) {
    return sanityFetch<CaseStudy[]>(q.featuredCaseStudiesQuery);
  }
  return [...seedCaseStudies]
    .filter((c) => c.featured !== false)
    .sort((a, b) => a.order - b.order);
}

export async function getCaseStudySlugs(): Promise<string[]> {
  if (isSanityConfigured) {
    const rows = await sanityFetch<{ slug: string }[]>(q.caseStudySlugsQuery);
    return rows.map((r) => r.slug).filter(Boolean);
  }
  return seedCaseStudies.filter((c) => c.hasCasePage).map((c) => c.slug);
}

export async function getCaseStudy(slug: string): Promise<CaseStudy | null> {
  if (isSanityConfigured) {
    return sanityFetch<CaseStudy | null>(q.caseStudyBySlugQuery, { slug });
  }
  return seedCaseStudies.find((c) => c.slug === slug) ?? null;
}

export async function getSiteSettings(): Promise<SiteSettings> {
  if (isSanityConfigured) {
    const data = await sanityFetch<SiteSettings | null>(q.siteSettingsQuery);
    if (data) return data;
  }
  return seedSiteSettings;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (isSanityConfigured) {
    return sanityFetch<BlogPost[]>(q.blogPostsQuery);
  }
  return [...seedBlogPosts].sort(
    (a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt),
  );
}

export async function getBlogSlugs(): Promise<string[]> {
  if (isSanityConfigured) {
    const rows = await sanityFetch<{ slug: string }[]>(q.blogSlugsQuery);
    return rows.map((r) => r.slug).filter(Boolean);
  }
  return seedBlogPosts.map((p) => p.slug);
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  if (isSanityConfigured) {
    return sanityFetch<BlogPost | null>(q.blogPostBySlugQuery, { slug });
  }
  return seedBlogPosts.find((p) => p.slug === slug) ?? null;
}

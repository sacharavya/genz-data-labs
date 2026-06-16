/** GROQ queries. slug is normalized to a plain string to match lib/types. */

export const featuredCaseStudiesQuery = `
*[_type == "caseStudy" && featured == true] | order(order asc) {
  ...,
  "slug": slug.current
}`;

export const caseStudySlugsQuery = `
*[_type == "caseStudy" && hasCasePage == true && defined(slug.current)] {
  "slug": slug.current
}`;

export const caseStudyBySlugQuery = `
*[_type == "caseStudy" && slug.current == $slug][0] {
  ...,
  "slug": slug.current
}`;

export const siteSettingsQuery = `*[_type == "siteSettings"][0]`;

export const blogPostsQuery = `
*[_type == "blogPost"] | order(publishedAt desc) {
  ...,
  "slug": slug.current
}`;

export const blogSlugsQuery = `
*[_type == "blogPost" && defined(slug.current)] {
  "slug": slug.current
}`;

export const blogPostBySlugQuery = `
*[_type == "blogPost" && slug.current == $slug][0] {
  ...,
  "slug": slug.current
}`;

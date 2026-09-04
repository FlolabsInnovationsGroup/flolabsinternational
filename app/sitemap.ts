import type { MetadataRoute } from "next";

import { blogPosts, projects } from "@/lib/site-data";
import { SITE_URL } from "@/lib/site-metadata";
import { getAllInternships } from "@/lib/strapi";

export const revalidate = 3600;

function pageUrl(path: string) {
  if (!path || path === "/") return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

function parseDate(value: string | undefined): Date | undefined {
  if (!value) return undefined;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return undefined;
  return new Date(Date.UTC(parsed.getFullYear(), parsed.getMonth(), parsed.getDate()));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const internships = await getAllInternships().catch(() => []);
  const seenInternshipSlugs = new Set<string>();

  const staticPages: MetadataRoute.Sitemap = [
    { url: pageUrl("/"), changeFrequency: "weekly", priority: 1 },
    { url: pageUrl("/about"), changeFrequency: "monthly", priority: 0.8 },
    { url: pageUrl("/projects"), changeFrequency: "weekly", priority: 0.9 },
    { url: pageUrl("/internships"), changeFrequency: "daily", priority: 0.9 },
    { url: pageUrl("/blogs"), changeFrequency: "weekly", priority: 0.8 },
    { url: pageUrl("/contact"), changeFrequency: "monthly", priority: 0.7 },
  ];

  const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
    url: pageUrl(`/projects/${project.slug}`),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: pageUrl(`/blogs/${post.slug}`),
    lastModified: parseDate(post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const internshipPages: MetadataRoute.Sitemap = internships.flatMap((internship) => {
    const slug = internship.slug?.trim();
    if (!slug || seenInternshipSlugs.has(slug)) return [];
    seenInternshipSlugs.add(slug);

    return [
      {
        url: pageUrl(`/internships/${slug}`),
        changeFrequency: "weekly" as const,
        priority: internship.status === "Open" || internship.status === "Closing Soon" ? 0.8 : 0.5,
      },
    ];
  });

  return [...staticPages, ...projectPages, ...blogPages, ...internshipPages];
}

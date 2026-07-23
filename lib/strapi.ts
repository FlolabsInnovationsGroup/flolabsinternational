import { internshipPositions } from "@/lib/site-data";

/**
 * Strapi (or any REST source) → UI shape.
 * Configure:
 * - STRAPI_URL or NEXT_PUBLIC_STRAPI_URL: e.g. https://cms.example.com (no trailing slash)
 * - STRAPI_API_TOKEN: optional, for private collections (server-only; do not use NEXT_PUBLIC_)
 * - STRAPI_INTERNSHIP_COLLECTION: API path segment, default "internships"
 * - STRAPI_PAGE_SIZE: page size for list requests (default 100). Strapi's default is 25,
 *   so without pagination you only see the first 25 entries.
 *
 * Expected fields per entry (Strapi "API name"): title, slug, status, location,
 * company, schedule, summary, description (long text), hubspotFormId (string).
 * Works with Strapi v4 `{ data: [{ id, attributes }] }` or v5-style flat `data` items.
 */
export type Internship = {
  id: string | number;
  slug: string;
  title: string;
  status: string;
  location?: string;
  company?: string;
  schedule?: string;
  summary?: string;
  description?: string;
  hubspotFormId?: string;
};

const collection =
  process.env.STRAPI_INTERNSHIP_COLLECTION?.trim() || "internships";

/** Same host as README / deploy scripts when env vars are unset (e.g. local `npm run dev`). */
const DEFAULT_STRAPI_URL = "https://strapi-production-7ecb.up.railway.app";

/**
 * Normalize CMS base URL from env. Common Vercel mistakes that break `fetch`:
 * - missing `https://`
 * - surrounding quotes copied from docs
 * - trailing slash / whitespace / newlines
 */
function normalizeStrapiBaseUrl(raw: string | undefined | null): string | null {
  if (!raw) return null;
  let u = raw.trim().replace(/^['"]|['"]$/g, "").trim();
  if (!u) return null;

  if (!/^https?:\/\//i.test(u)) {
    u = `https://${u}`;
  }

  try {
    const parsed = new URL(u);
    if (!parsed.hostname) return null;
    return `${parsed.protocol}//${parsed.host}`;
  } catch {
    return null;
  }
}

function baseUrl() {
  const configured =
    process.env.STRAPI_URL?.trim() ||
    process.env.NEXT_PUBLIC_STRAPI_URL?.trim() ||
    process.env.CONTENT_STRAPI_URL?.trim() ||
    "";

  const normalized = normalizeStrapiBaseUrl(configured);
  if (normalized) return normalized;

  if (configured) {
    console.warn(
      `[strapi] invalid STRAPI URL env value ${JSON.stringify(configured)}; falling back to default`,
    );
  }

  return DEFAULT_STRAPI_URL;
}

/** Hostname-only debug helper (avoids dumping full secrets in responses). */
export function getStrapiDebugInfo() {
  const configuredRaw =
    process.env.STRAPI_URL?.trim() ||
    process.env.NEXT_PUBLIC_STRAPI_URL?.trim() ||
    process.env.CONTENT_STRAPI_URL?.trim() ||
    null;
  const resolved = baseUrl();
  let hostname: string | null = null;
  try {
    hostname = new URL(resolved).hostname;
  } catch {
    hostname = null;
  }
  return {
    usingDefaultUrl: !normalizeStrapiBaseUrl(configuredRaw),
    strapiHost: hostname,
    strapiBase: resolved,
    strapiBaseValid: Boolean(hostname),
    configuredLooksInvalid: Boolean(configuredRaw && !normalizeStrapiBaseUrl(configuredRaw)),
    hasApiToken: Boolean(process.env.STRAPI_API_TOKEN?.trim()),
    collection: process.env.STRAPI_INTERNSHIP_COLLECTION?.trim() || "internships",
  };
}

function authHeaders(includeToken = true): HeadersInit {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  const token = includeToken ? process.env.STRAPI_API_TOKEN?.trim() : undefined;
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

/**
 * Public Strapi collections work without a token. An expired/invalid
 * STRAPI_API_TOKEN on Vercel previously caused 401 → empty internship lists.
 */
async function fetchStrapiJson(url: string): Promise<{ ok: boolean; status: number; json: unknown }> {
  const tryOnce = async (includeToken: boolean) => {
    const res = await fetch(url, {
      headers: authHeaders(includeToken),
      next: { revalidate: 60 },
    });
    let json: unknown = null;
    try {
      json = await res.json();
    } catch {
      json = null;
    }
    return { ok: res.ok, status: res.status, json };
  };

  const hasToken = Boolean(process.env.STRAPI_API_TOKEN?.trim());
  const first = await tryOnce(true);
  if (first.ok) return first;

  if (hasToken && (first.status === 401 || first.status === 403)) {
    console.warn(
      `[strapi] ${first.status} with STRAPI_API_TOKEN; retrying public request without auth`,
    );
    return tryOnce(false);
  }

  console.warn(`[strapi] request failed ${first.status} for ${url}`);
  return first;
}

function readField(obj: Record<string, unknown>, key: string): unknown {
  if (key in obj) return obj[key];
  const attrs = obj.attributes;
  if (attrs && typeof attrs === "object" && attrs !== null && key in attrs) {
    return (attrs as Record<string, unknown>)[key];
  }
  return undefined;
}

function strInternshipStatus(value: unknown): string {
  if (value == null) return "Open";
  if (typeof value === "string") return value;
  if (typeof value === "object" && value !== null && "name" in value) {
    const n = (value as { name?: unknown }).name;
    if (typeof n === "string") return n;
  }
  return String(value);
}

function mapEntry(raw: unknown, index: number): Internship | null {
  if (!raw || typeof raw !== "object") return null;
  const obj = raw as Record<string, unknown>;
  const rawId = obj.id ?? obj.documentId ?? index;
  const id: string | number =
    typeof rawId === "string" || typeof rawId === "number" ? rawId : index;
  const slug = readField(obj, "slug");
  const title = readField(obj, "title");
  if (typeof slug !== "string" || !slug || typeof title !== "string" || !title) {
    return null;
  }

  const hubspotRaw = readField(obj, "hubspotFormId");
  const hubspotFormId =
    typeof hubspotRaw === "string" && hubspotRaw ? hubspotRaw : undefined;

  return {
    id,
    slug,
    title,
    status: strInternshipStatus(
      readField(obj, "internship_status") ?? readField(obj, "status"),
    ),
    location: stringOrUndefined(readField(obj, "location")),
    company: stringOrUndefined(readField(obj, "company")),
    schedule: stringOrUndefined(readField(obj, "schedule")),
    summary: stringOrUndefined(readField(obj, "summary")),
    description: stringOrUndefined(readField(obj, "description")),
    hubspotFormId,
  };
}

function stringOrUndefined(v: unknown): string | undefined {
  if (typeof v === "string") {
    const t = v.trim();
    return t || undefined;
  }
  return undefined;
}

function extractList(payload: unknown): unknown[] {
  if (!payload || typeof payload !== "object") return [];
  const data = (payload as { data?: unknown }).data;
  if (!Array.isArray(data)) return [];
  return data;
}

function strapiPageSize(): number {
  const raw = process.env.STRAPI_PAGE_SIZE?.trim();
  const n = raw ? parseInt(raw, 10) : 100;
  if (!Number.isFinite(n) || n < 1) return 100;
  return Math.min(n, 250);
}

function readPaginationPageCount(payload: unknown): number | undefined {
  if (!payload || typeof payload !== "object") return undefined;
  const meta = (payload as { meta?: { pagination?: { page?: number; pageCount?: number } } })
    .meta;
  const pageCount = meta?.pagination?.pageCount;
  return typeof pageCount === "number" && pageCount >= 1 ? pageCount : undefined;
}

/**
 * Strapi REST paginates by default (pageSize 25 in Strapi 5). Fetch every page so the UI
 * sees all published entries (capped by the host's maxLimit per request).
 */
async function fetchStrapiList(): Promise<Internship[]> {
  const root = baseUrl();
  if (!root) return [];

  const pageSize = strapiPageSize();
  const all: Internship[] = [];

  try {
    for (let page = 1; page <= 200; page++) {
      const qs = new URLSearchParams();
      qs.set("populate", "*");
      qs.set("sort", "title:asc");
      qs.set("pagination[page]", String(page));
      qs.set("pagination[pageSize]", String(pageSize));

      const url = `${root}/api/${collection}?${qs.toString()}`;
      const res = await fetchStrapiJson(url);
      if (!res.ok) break;

      const json = res.json;
      const list = extractList(json);

      for (let i = 0; i < list.length; i++) {
        const mapped = mapEntry(list[i], all.length + i);
        if (mapped) all.push(mapped);
      }

      const pageCount = readPaginationPageCount(json);
      if (pageCount != null) {
        if (page >= pageCount) break;
        continue;
      }

      if (list.length < pageSize) break;
    }
  } catch {
    return all;
  }

  return all;
}

async function fetchStrapiOneBySlug(slug: string): Promise<Internship | null> {
  const root = baseUrl();
  if (!root) return null;

  const enc = encodeURIComponent(slug);
  const url = `${root}/api/${collection}?filters[slug][$eq]=${enc}&populate=*`;
  try {
    const res = await fetchStrapiJson(url);
    if (!res.ok) return null;
    const list = extractList(res.json);
    const first = list[0];
    return first ? mapEntry(first, 0) : null;
  } catch {
    return null;
  }
}

function localFallback(): Internship[] {
  return internshipPositions.map((p, i) => ({
    id: `local-${i}-${p.slug}`,
    slug: p.slug,
    title: p.title,
    status: p.status,
    location: p.location,
    company: p.company,
    schedule: p.schedule,
    summary: p.summary,
    description: p.description,
    hubspotFormId: p.hubspotFormId,
  }));
}

/** All listings: Strapi when configured and non-empty; otherwise `internshipPositions` in site-data. */
export async function getAllInternships(): Promise<Internship[]> {
  const remote = await fetchStrapiList();
  if (remote.length > 0) return remote;
  return localFallback();
}

/** Alias for API route compatibility */
export const getInternships = getAllInternships;

/** Single role: Strapi by slug when configured; else match local fallback. */
export async function getInternship(slug: string): Promise<Internship | null> {
  if (baseUrl()) {
    const one = await fetchStrapiOneBySlug(slug);
    if (one) return one;
  }
  const local = localFallback().find((i) => i.slug === slug);
  return local ?? null;
}

/** Alias for legacy compatibility */
export const getInternshipBySlug = getInternship;

// ---------------------------------------------------------------------------
// Legacy stubs – used by older components (verticals.tsx, contact/page.tsx).
// These return empty data until a full migration is done.
// ---------------------------------------------------------------------------

export type Vertical = {
  id: string | number;
  title: string;
  description?: string;
  icon?: string;
};

export async function getVerticals(): Promise<Vertical[]> {
  return [];
}

export async function getSectionContent(_slug: string): Promise<{ content?: string } | null> {
  return null;
}

export async function getSiteSettings(): Promise<{
  contactEmail?: string;
  socialLinks?: { linkedin?: string };
} | null> {
  return null;
}

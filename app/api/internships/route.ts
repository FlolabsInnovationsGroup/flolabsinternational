import { NextResponse } from "next/server";
import { getInternships } from "@/lib/strapi";

function strapiDebugInfo() {
  const configured =
    process.env.STRAPI_URL?.trim() ||
    process.env.NEXT_PUBLIC_STRAPI_URL?.trim() ||
    process.env.CONTENT_STRAPI_URL?.trim() ||
    null;
  const base =
    configured || "https://strapi-production-7ecb.up.railway.app (default)";
  return {
    strapiBase: base.replace(/\/$/, ""),
    usingDefaultUrl: !configured,
    hasApiToken: Boolean(process.env.STRAPI_API_TOKEN?.trim()),
    collection: process.env.STRAPI_INTERNSHIP_COLLECTION?.trim() || "internships",
  };
}

export async function GET(request: Request) {
  const debug = new URL(request.url).searchParams.get("debug") === "1";

  try {
    const all = await getInternships();
    const internships = all.filter((i) => i.status === "Open");

    if (debug) {
      const info = strapiDebugInfo();
      const baseUrl = info.strapiBase.replace(/ \(default\)$/, "");
      let upstream: { status: number | null; total: number | null; error: string | null } = {
        status: null,
        total: null,
        error: null,
      };
      try {
        const qs = new URLSearchParams({
          "pagination[page]": "1",
          "pagination[pageSize]": "1",
        });
        const url = `${baseUrl}/api/${info.collection}?${qs}`;
        const res = await fetch(url, {
          headers: { "Content-Type": "application/json" },
          cache: "no-store",
        });
        const json = (await res.json().catch(() => null)) as {
          meta?: { pagination?: { total?: number } };
          error?: { message?: string };
        } | null;
        upstream = {
          status: res.status,
          total: json?.meta?.pagination?.total ?? null,
          error: res.ok ? null : json?.error?.message || res.statusText,
        };
      } catch (e) {
        upstream = {
          status: null,
          total: null,
          error: e instanceof Error ? e.message : String(e),
        };
      }

      return NextResponse.json({
        count: internships.length,
        allCount: all.length,
        statuses: Object.fromEntries(
          [...new Set(all.map((i) => i.status))].map((s) => [
            s,
            all.filter((i) => i.status === s).length,
          ]),
        ),
        debug: { ...info, upstream },
        sample: internships.slice(0, 3).map((i) => ({
          title: i.title,
          slug: i.slug,
          status: i.status,
        })),
      });
    }

    return NextResponse.json(internships);
  } catch (error) {
    console.error("Error fetching internships:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch internships",
        ...(debug
          ? {
              detail: error instanceof Error ? error.message : String(error),
              debug: strapiDebugInfo(),
            }
          : {}),
      },
      { status: 500 },
    );
  }
}

export const revalidate = 60;

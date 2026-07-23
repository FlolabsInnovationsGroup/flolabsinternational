import { NextResponse } from "next/server";
import { getInternships, getStrapiDebugInfo } from "@/lib/strapi";

export async function GET(request: Request) {
  const debug = new URL(request.url).searchParams.get("debug") === "1";

  try {
    const all = await getInternships();
    const internships = all.filter((i) => i.status === "Open");

    if (debug) {
      const info = getStrapiDebugInfo();
      let upstream: { status: number | null; total: number | null; error: string | null } = {
        status: null,
        total: null,
        error: null,
      };

      if (info.strapiBaseValid && info.strapiBase) {
        try {
          const qs = new URLSearchParams({
            "pagination[page]": "1",
            "pagination[pageSize]": "1",
          });
          const url = `${info.strapiBase}/api/${info.collection}?${qs}`;
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
      } else {
        upstream = {
          status: null,
          total: null,
          error: "invalid or missing Strapi base URL",
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
        debug: {
          usingDefaultUrl: info.usingDefaultUrl,
          strapiHost: info.strapiHost,
          strapiBaseValid: info.strapiBaseValid,
          configuredLooksInvalid: info.configuredLooksInvalid,
          hasApiToken: info.hasApiToken,
          collection: info.collection,
          upstream,
        },
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
              debug: getStrapiDebugInfo(),
            }
          : {}),
      },
      { status: 500 },
    );
  }
}

export const revalidate = 60;

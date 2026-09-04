"use client";

import { usePathname } from "next/navigation";
import { useCallback } from "react";
import { useTheme } from "next-themes";

import {
  PREFERRED_SOURCE_DEEPLINK,
  PREFERRED_SOURCE_SCRIPT_SRC,
  isPreferredSourcePrivatePath,
} from "@/lib/preferred-source";
import { cn } from "@/lib/utils";

type PreferredSourceClient = {
  init: (options: { theme?: "light" | "dark"; lang?: string }) => void;
  addPreferredSource: () => void;
};

type PreferredSourceQueue = Array<(client: PreferredSourceClient) => void>;

declare global {
  interface Window {
    PREFERRED_SOURCE?: PreferredSourceClient | PreferredSourceQueue;
  }
}

const SCRIPT_ID = "google-preferred-source";

function ensurePreferredSourceScript() {
  if (document.getElementById(SCRIPT_ID)) {
    return;
  }

  const script = document.createElement("script");
  script.id = SCRIPT_ID;
  script.async = true;
  script.src = PREFERRED_SOURCE_SCRIPT_SRC;
  script.setAttribute("preferred-sources-control", "manual");
  document.body.appendChild(script);
}

function withPreferredSourceClient(callback: (client: PreferredSourceClient) => void) {
  const existing = window.PREFERRED_SOURCE;

  if (existing && !Array.isArray(existing)) {
    callback(existing);
    return;
  }

  const queue: PreferredSourceQueue = Array.isArray(existing) ? existing : [];
  queue.push(callback);
  window.PREFERRED_SOURCE = queue;
}

export function preloadPreferredSourceScript() {
  if (typeof document === "undefined") {
    return;
  }

  ensurePreferredSourceScript();
}

export function usePreferredSourceAction() {
  const { resolvedTheme } = useTheme();

  return useCallback(() => {
    ensurePreferredSourceScript();

    let completed = false;
    const theme = resolvedTheme === "dark" ? "dark" : "light";

    const fallback = window.setTimeout(() => {
      if (completed) {
        return;
      }
      window.location.assign(PREFERRED_SOURCE_DEEPLINK);
    }, 1600);

    withPreferredSourceClient((client) => {
      completed = true;
      window.clearTimeout(fallback);
      client.init({ theme, lang: "en" });
      client.addPreferredSource();
    });
  }, [resolvedTheme]);
}

const highlightedActionClass =
  "inline-flex items-center gap-2.5 border border-white/70 bg-white/55 text-foreground shadow-[0_8px_20px_rgba(0,8,13,0.08)] backdrop-blur-sm transition hover:border-white hover:bg-white/75 dark:border-white/25 dark:bg-white/20 dark:hover:bg-white/30";

function GoogleColorLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("shrink-0", className)}
      aria-hidden
    >
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09Z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53Z"
      />
    </svg>
  );
}

export function PreferredSourceFooterLink({ className }: { className?: string }) {
  const pathname = usePathname();

  if (isPreferredSourcePrivatePath(pathname)) {
    return null;
  }

  return (
    <a
      href={PREFERRED_SOURCE_DEEPLINK}
      className={cn(
        highlightedActionClass,
        "min-h-10 px-3 text-[13px] font-medium",
        className,
      )}
    >
      <GoogleColorLogo className="size-5" />
      Add as preferred source on Google
    </a>
  );
}

export function PreferredSourceChipAction({
  className,
  onTriggered,
}: {
  className?: string;
  onTriggered?: () => void;
}) {
  const addPreferredSource = usePreferredSourceAction();

  return (
    <button
      type="button"
      className={cn(
        highlightedActionClass,
        "min-h-10 px-3.5 text-[0.68rem] font-semibold uppercase tracking-[0.16em]",
        className,
      )}
      onClick={() => {
        onTriggered?.();
        addPreferredSource();
      }}
    >
      <GoogleColorLogo className="size-[18px]" />
      Add on Google
    </button>
  );
}

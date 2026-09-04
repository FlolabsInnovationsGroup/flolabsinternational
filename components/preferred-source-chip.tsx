"use client";

import { X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { PreferredSourceChipAction, preloadPreferredSourceScript } from "@/components/preferred-source-button";
import {
  PREFERRED_SOURCE_CHIP_DELAY_MS,
  PREFERRED_SOURCE_CHIP_SCROLL_PX,
  isPreferredSourceDismissed,
  isPreferredSourcePrivatePath,
  readPreferredSourceDismissedAt,
  writePreferredSourceDismissedAt,
} from "@/lib/preferred-source";

function isCurrentlyDismissed() {
  return isPreferredSourceDismissed(
    Date.now(),
    readPreferredSourceDismissedAt(window.localStorage),
  );
}

export function PreferredSourceChip() {
  const pathname = usePathname();
  const unlockedRef = useRef(false);
  const [open, setOpen] = useState(false);

  const dismiss = useCallback(() => {
    writePreferredSourceDismissedAt(window.localStorage, Date.now());
    unlockedRef.current = false;
    setOpen(false);
  }, []);

  useEffect(() => {
    if (isPreferredSourcePrivatePath(pathname) || isCurrentlyDismissed()) {
      setOpen(false);
      return;
    }

    if (unlockedRef.current) {
      setOpen(true);
      return;
    }

    let unlocked = false;
    const unlock = () => {
      if (unlocked || isCurrentlyDismissed()) {
        return;
      }
      unlocked = true;
      unlockedRef.current = true;
      preloadPreferredSourceScript();
      setOpen(true);
    };

    const timeoutId = window.setTimeout(unlock, PREFERRED_SOURCE_CHIP_DELAY_MS);
    const onScroll = () => {
      if (window.scrollY >= PREFERRED_SOURCE_CHIP_SCROLL_PX) {
        unlock();
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        dismiss();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, dismiss]);

  if (!open) {
    return null;
  }

  return (
    <aside
      aria-label="Add FloLabs as a preferred source on Google"
      className="preferred-source-chip pointer-events-auto fixed left-4 z-40 w-[min(20.5rem,calc(100vw-2rem))] border border-white/55 bg-white/40 p-3 shadow-[var(--glass-shadow)] backdrop-blur-md motion-safe:animate-[preferred-source-chip-in_280ms_ease-out] motion-reduce:animate-none dark:border-white/20 dark:bg-white/12"
    >
      <div className="flex items-start gap-2">
        <p className="min-w-0 flex-1 text-base font-medium leading-snug text-foreground">
          See FloLabs{" "}
          <span className="text-primary">more often</span> on Google
        </p>
        <button
          type="button"
          onClick={dismiss}
          className="inline-flex size-8 shrink-0 items-center justify-center text-muted transition-colors hover:text-foreground"
          aria-label="Dismiss preferred source reminder"
        >
          <X className="size-4" strokeWidth={1.75} aria-hidden />
        </button>
      </div>
      <div className="mt-4">
        <PreferredSourceChipAction onTriggered={dismiss} />
      </div>
    </aside>
  );
}

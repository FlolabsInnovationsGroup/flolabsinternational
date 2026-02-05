"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    mixpanel: any;
  }
}

export default function MixpanelTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.mixpanel) {
      window.mixpanel.track("Page View", {
        page: pathname,
      });
    }
  }, [pathname]);

  return null;
}

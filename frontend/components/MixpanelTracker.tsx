"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    mixpanel?: any;
  }
}

export default function MixpanelTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Wait until Mixpanel is actually ready
    if (window.mixpanel && typeof window.mixpanel.track === "function") {
      window.mixpanel.track("Page Viewed", { page: pathname });
    }
  }, [pathname]);

  return null;
}




// "use client";

// import { useEffect } from "react";
// import { usePathname } from "next/navigation";

// declare global {
//   interface Window {
//     mixpanel: any;
//   }
// }

// export default function MixpanelTracker() {
//   const pathname = usePathname();

//   useEffect(() => {
//     if (window.mixpanel) {
//       window.mixpanel.track("Page View", {
//         page: pathname,
//       });
//     }
//   }, [pathname]);

//   return null;
// }

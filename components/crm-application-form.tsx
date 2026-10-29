"use client";

import { useEffect, useRef, useState } from "react";

const CRM_APPLICATION_FORM_SRC =
  "https://crm.flolabsinnovations.com/forms/72138f98-ad15-4929-af96-be3868b77adb/4dcfa23a-13c8-4a6e-9445-13599eafcbd3?embed=1";

const FORM_ID = "4dcfa23a-13c8-4a6e-9445-13599eafcbd3";

export function CrmApplicationForm() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [mounted, setMounted] = useState(false);
  const [height, setHeight] = useState(2200);

  useEffect(() => {
    function onMessage(event: MessageEvent) {
      const fromThisFrame = event.source === iframeRef.current?.contentWindow;
      const fromCrm =
        event.origin === "https://crm.flolabsinnovations.com" || event.origin === "null";
      if (!fromThisFrame && !fromCrm) return;
      const data = event.data as { type?: string; formId?: string; height?: number } | null;
      if (!data || data.formId !== FORM_ID || data.type !== "flolabs-form:resize") return;
      const next = Number(data.height);
      if (!Number.isFinite(next) || next < 200) return;
      setHeight(Math.ceil(next));
    }

    window.addEventListener("message", onMessage);
    setMounted(true);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <div className="mx-auto w-full max-w-[700px] rounded-lg bg-white shadow-sm">
      {mounted ? (
        <iframe
          ref={iframeRef}
          src={CRM_APPLICATION_FORM_SRC}
          title="FloLabs Application form"
          className="block w-full border-0"
          style={{ height }}
          scrolling="no"
        />
      ) : (
        <div style={{ height }} />
      )}
    </div>
  );
}

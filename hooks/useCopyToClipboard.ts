"use client";

import { useCallback, useRef, useState } from "react";

type CopyType = "email" | "phone";

export function useCopyToClipboard(timeoutMs = 2000) {
  const [copied, setCopied] = useState<CopyType | null>(null);
  const timerRef = useRef<number | null>(null);

  const copyToClipboard = useCallback(
    async (text: string, type: CopyType) => {
      try {
        if (!text) return;

        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(text);
        } else {
          const ta = document.createElement("textarea");
          ta.value = text;
          ta.setAttribute("readonly", "");
          ta.style.position = "absolute";
          ta.style.left = "-9999px";
          document.body.appendChild(ta);
          ta.select();
          document.execCommand("copy");
          document.body.removeChild(ta);
        }

        setCopied(type);

        if (timerRef.current) window.clearTimeout(timerRef.current);
        timerRef.current = window.setTimeout(() => setCopied(null), timeoutMs);
      } catch (err) {
        console.error("Copy failed:", err);
      }
    },
    [timeoutMs]
  );

  return { copied, copyToClipboard };
}

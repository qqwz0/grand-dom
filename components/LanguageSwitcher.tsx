"use client";
import React, { useRef, useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

export default function LanguageSwitcher({
  languages,
  currentLanguage,
  switchLanguage,
  dark = false,
}: {
  languages: any[];
  currentLanguage: any;
  switchLanguage: (code: string) => void;
  dark?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const btnColor = dark ? "rgba(255,255,255,0.9)" : "var(--gd-ink)";
  const btnBorder = dark
    ? "1px solid rgba(255,255,255,0.35)"
    : "1px solid var(--gd-border)";
  const btnBg = dark ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.9)";

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          background: btnBg,
          border: btnBorder,
          color: btnColor,
          padding: "7px 14px",
          borderRadius: 999,
          cursor: "pointer",
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize: 12,
          fontWeight: 400,
          letterSpacing: "0.04em",
          backdropFilter: "blur(6px)",
          transition: "all 0.2s",
        }}
      >
        <span>{currentLanguage.flag}</span>
        <span>{currentLanguage.name}</span>
        <ChevronDown
          size={12}
          style={{
            transition: "transform 0.2s",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            right: 0,
            background: "rgba(255,255,255,0.97)",
            backdropFilter: "blur(14px)",
            border: "1px solid var(--gd-border)",
            borderRadius: 12,
            boxShadow: "0 12px 40px -12px rgba(20,40,30,0.2)",
            overflow: "hidden",
            minWidth: 148,
            zIndex: 200,
          }}
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                switchLanguage(lang.code);
                setOpen(false);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                width: "100%",
                padding: "10px 16px",
                background:
                  currentLanguage.code === lang.code
                    ? "var(--gd-teal-lt)"
                    : "transparent",
                color:
                  currentLanguage.code === lang.code
                    ? "var(--gd-teal)"
                    : "var(--gd-ink)",
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: 13,
                fontWeight: currentLanguage.code === lang.code ? 500 : 400,
                textAlign: "left",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => {
                if (currentLanguage.code !== lang.code) {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "var(--gd-teal-lt)";
                }
              }}
              onMouseLeave={(e) => {
                if (currentLanguage.code !== lang.code) {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "transparent";
                }
              }}
            >
              <span style={{ fontSize: 16 }}>{lang.flag}</span>
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

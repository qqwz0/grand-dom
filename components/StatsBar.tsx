import React from "react";

export default function StatsBar({ get }: { get: (path: string[], fallback?: any) => any }) {
  const stats = get(["stats", "items"], [
    { value: "50+", label: "Mieszkań w ofercie" },
    { value: "15", label: "Dzielnic Warszawy" },
    { value: "2024", label: "Rok założenia" },
    { value: "24/7", label: "Kontakt z agentem" },
  ]);

  return (
    <div style={{ background: "var(--gd-teal)", padding: "0 clamp(20px, 5vw, 48px)" }}>
      <div
        className="gd-stats-grid"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: `repeat(${stats.length}, 1fr)`,
        }}
      >
        {stats.map(({ value, label }: { value: string; label: string }, i: number) => (
          <div
            key={i}
            style={{
              padding: "38px 24px",
              textAlign: "center",
              borderRight:
                i < stats.length - 1
                  ? "1px solid rgba(255,255,255,0.08)"
                  : "none",
            }}
          >
            <div
              className="gd-heading"
              style={{
                fontSize: 42,
                fontWeight: 300,
                color: "var(--gd-gold)",
                lineHeight: 1,
              }}
            >
              {value}
            </div>
            <div
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: 11,
                color: "rgba(255,255,255,0.6)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginTop: 8,
              }}
            >
              {label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

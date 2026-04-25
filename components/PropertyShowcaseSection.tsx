"use client";
import React from "react";
import Image from "next/image";

export default function PropertyShowcaseSection({ get }: any) {
  const featureStats = get(["propertyShowcase", "featureStats"], [
    { value: "50+", label: "Mieszkań w ofercie" },
    { value: "15", label: "Dzielnic Warszawy" },
  ]);

  return (
    <section
      id="properties"
      style={{ background: "#ffffff", overflow: "hidden" }}
    >
      <div
        className="gd-showcase-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          minHeight: 600,
        }}
      >
        {/* Image side */}
        <div
          className="gd-showcase-img"
          style={{
            position: "relative",
            overflow: "hidden",
            minHeight: 480,
          }}
        >
          <Image
            src="/photo_2025-12-21_18-18-44.jpg"
            alt={get(
              ["propertyShowcase", "imageAlt"],
              "Eleganckie wnętrze nieruchomości"
            )}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{
              objectFit: "cover",
              transition: "transform 0.8s ease",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLImageElement).style.transform =
                "scale(1.04)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLImageElement).style.transform =
                "scale(1)")
            }
          />
          <div
            style={{
              position: "absolute",
              bottom: 36,
              left: 36,
              background: "var(--gd-gold)",
              color: "#fff",
              padding: "10px 20px",
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: 12,
              letterSpacing: "0.06em",
              borderRadius: 999,
              boxShadow: "0 8px 24px -8px rgba(180,130,50,0.55)",
            }}
          >
            {get(["propertyShowcase", "heading"], "Wybrane oferty")}
          </div>
        </div>

        {/* Text side */}
        <div
          className="gd-showcase-text"
          style={{
            padding: "80px clamp(40px, 6vw, 72px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            background: "var(--gd-cream)",
          }}
        >
          {/* Gold uppercase label */}
          <div className="gd-label" style={{ marginBottom: 16 }}>
            {get(["propertyShowcase", "label"], "Nieruchomości premium")}
          </div>

          {/* Short two-line serif heading */}
          <h2
            className="gd-heading"
            style={{
              fontSize: "clamp(32px, 3.5vw, 48px)",
              fontWeight: 300,
              color: "var(--gd-ink)",
              lineHeight: 1.1,
              marginBottom: 8,
            }}
          >
            {get(["propertyShowcase", "heading"], "Eleganckie wnętrza,")}
            <br />
            <em style={{ fontStyle: "italic", fontWeight: 300 }}>
              {get(["propertyShowcase", "subheading"], "wyjątkowa jakość")}
            </em>
          </h2>

          {/* Gold divider */}
          <div
            style={{
              width: 48,
              height: 2,
              background: "var(--gd-gold)",
              margin: "20px 0",
            }}
          />

          {/* Description */}
          <p
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: 15,
              color: "var(--gd-muted)",
              lineHeight: 1.85,
              marginBottom: 40,
            }}
          >
            {get(
              ["propertyShowcase", "description"],
              "Nasze oferty to mieszkania w sprawdzonych lokalizacjach — z dobrym układem, jasnym widokiem i sąsiedztwem, w którym chce się zostać."
            )}
          </p>

          {/* Stats */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 24,
              marginBottom: 48,
            }}
          >
            {featureStats.map(
              ({ value, label }: { value: string; label: string }, i: number) => (
                <div key={i}>
                  <div
                    className="gd-heading"
                    style={{
                      fontSize: 48,
                      fontWeight: 300,
                      color: "var(--gd-teal)",
                      lineHeight: 1,
                    }}
                  >
                    {value}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: 11,
                      color: "var(--gd-muted)",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      marginTop: 6,
                    }}
                  >
                    {label}
                  </div>
                </div>
              )
            )}
          </div>

          {/* CTA link */}
          <a
            href="#contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              color: "var(--gd-teal)",
              textDecoration: "none",
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: "0.04em",
              borderBottom: "1px solid var(--gd-teal)",
              paddingBottom: 4,
              width: "fit-content",
              transition: "gap 0.2s",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.gap = "20px")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.gap = "12px")
            }
          >
            {get(["cta", "viewProperties"], "Zobacz dostępne oferty")}
            <svg width="16" height="8" viewBox="0 0 16 8" fill="none">
              <path
                d="M0 4h14M10 1l4 3-4 3"
                stroke="currentColor"
                strokeWidth="1.2"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

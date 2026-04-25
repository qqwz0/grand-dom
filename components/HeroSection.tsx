"use client";
import React from "react";
import Image from "next/image";

export default function HeroSection({
  badgeText,
  heroSubheading,
  heroText,
  contactEmail,
  contactPhone,
  contactLocation,
  get,
}: any) {
  const phoneHref = `tel:${contactPhone?.replace(/[\s()]/g, "")}`;
  const emailHref = `mailto:${contactEmail}`;

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        height: "100vh",
        minHeight: 640,
        overflow: "hidden",
      }}
    >
      {/* Background photo */}
      <Image
        src="/photo_2025-10-09_22-28-44.jpg"
        alt=""
        fill
        priority
        quality={85}
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "center" }}
      />

      {/* Dark gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, rgba(16,52,50,0.82) 0%, rgba(16,52,50,0.55) 60%, rgba(16,52,50,0.18) 100%)",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 1200,
          margin: "0 auto",
          height: "100%",
          display: "flex",
          alignItems: "center",
          padding: "0 clamp(20px, 5vw, 48px)",
        }}
      >
        {/* Left: main copy */}
        <div style={{ maxWidth: 580 }}>
          {/* Pill label */}
          <div
            style={{
              display: "inline-block",
              border: "1px solid rgba(255,255,255,0.4)",
              color: "rgba(255,255,255,0.85)",
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontFamily: "var(--font-dm-sans), sans-serif",
              padding: "6px 16px",
              marginBottom: 32,
            }}
          >
            {badgeText}
          </div>

          {/* H1 — 3-line split: white / gold italic / white */}
          <h1
            className="gd-heading"
            style={{
              fontSize: "clamp(52px, 7vw, 92px)",
              fontWeight: 600,
              lineHeight: 1.02,
              color: "#ffffff",
              marginBottom: 28,
              letterSpacing: "-0.015em",
            }}
          >
            {get(["hero", "line1"], heroSubheading)}
            <br />
            <em
              style={{
                fontStyle: "italic",
                fontWeight: 600,
                color: "var(--gd-gold)",
              }}
            >
              {get(["hero", "line2"], "")}
            </em>
            {get(["hero", "line2"], "") && <br />}
            {get(["hero", "line3"], "")}
            <span style={{ color: "var(--gd-gold)" }}>.</span>
          </h1>

          {/* Subtext */}
          <p
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: 16,
              fontWeight: 300,
              color: "rgba(255,255,255,0.78)",
              lineHeight: 1.75,
              marginBottom: 44,
              maxWidth: 460,
            }}
          >
            {heroText}
          </p>

          {/* CTA buttons */}
          <div
            className="gd-hero-ctas"
            style={{ display: "flex", gap: 16, flexWrap: "wrap" }}
          >
            <a
              href="#services"
              style={{
                background: "var(--gd-gold)",
                color: "#fff",
                textDecoration: "none",
                padding: "16px 38px",
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: "0.04em",
                borderRadius: 999,
                transition: "opacity 0.2s",
                boxShadow: "0 8px 24px -8px rgba(180,130,50,0.55)",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.82")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")
              }
            >
              {get(["cta", "heroCta1"], "Zobacz ofertę")}
            </a>
            <a
              href="#contact"
              style={{
                border: "1px solid rgba(255,255,255,0.55)",
                color: "#fff",
                textDecoration: "none",
                padding: "16px 38px",
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: "0.04em",
                borderRadius: 999,
                background: "transparent",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.background =
                  "rgba(255,255,255,0.12)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.background =
                  "transparent")
              }
            >
              {get(
                ["cta", "heroCta2"],
                get(["contact", "getInTouch"], "Porozmawiajmy"),
              )}
            </a>
          </div>
        </div>

        {/* Bottom-right floating contact card */}
        <div
          className="gd-hero-card"
          style={{
            position: "absolute",
            right: "clamp(20px, 5vw, 48px)",
            bottom: 80,
            background: "rgba(255,255,255,0.97)",
            backdropFilter: "blur(14px)",
            padding: "30px 34px",
            minWidth: 270,
            borderRadius: 14,
            boxShadow:
              "0 20px 60px -20px rgba(20,40,30,0.4), 0 0 0 1px rgba(255,255,255,0.5)",
            borderTop: "3px solid var(--gd-gold)",
          }}
        >
          <div
            className="gd-label"
            style={{ marginBottom: 18, color: "var(--gd-muted)" }}
          >
            {get(["contact", "cardLabel"], "Bezpośredni kontakt")}
          </div>
          {[
            {
              label: get(["contact", "email", "label"], "E-mail"),
              value: contactEmail,
              href: emailHref,
            },
            {
              label: get(["contact", "phone", "label"], "Telefon"),
              value: contactPhone,
              href: phoneHref,
            },
            {
              label: get(["contact", "location", "label"], "Lokalizacja"),
              value: contactLocation,
              href: undefined,
            },
          ].map(({ label, value, href }) => (
            <div key={label} style={{ marginBottom: 14 }}>
              <div
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: 10,
                  color: "var(--gd-muted)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: 3,
                }}
              >
                {label}
              </div>
              {href ? (
                <a
                  href={href}
                  style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: 14,
                    color: "var(--gd-ink)",
                    fontWeight: 400,
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color =
                      "var(--gd-teal)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color =
                      "var(--gd-ink)")
                  }
                >
                  {value}
                </a>
              ) : (
                <div
                  style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: 14,
                    color: "var(--gd-ink)",
                    fontWeight: 400,
                  }}
                >
                  {value}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          color: "rgba(255,255,255,0.45)",
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize: 10,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
        }}
      >
        <span>{get(["ui", "scroll"], "Przewiń")}</span>
        <div
          style={{
            width: 1,
            height: 40,
            background: "rgba(255,255,255,0.3)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "40%",
              background: "rgba(255,255,255,0.7)",
              animation: "scrollBar 1.8s ease-in-out infinite",
            }}
          />
        </div>
      </div>
    </section>
  );
}

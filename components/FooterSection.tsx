import React from "react";
import Image from "next/image";

export default function FooterSection({
  get,
  brandName,
}: {
  get: (path: string[], fallback?: any) => any;
  brandName: string;
}) {
  const navLinks = [
    { label: get(["nav", "services"], "Usługi"), href: "#services" },
    { label: get(["nav", "properties"], "Nieruchomości"), href: "#properties" },
    { label: get(["nav", "spain"], "Hiszpania"), href: "#spain" },
    { label: get(["nav", "contact"], "Kontakt"), href: "#contact" },
  ];

  return (
    <footer
      style={{
        background: "var(--gd-ink)",
        padding: "52px clamp(20px, 5vw, 48px) 36px",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Top row */}
        <div
          className="gd-footer-top"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 48,
            paddingBottom: 40,
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            gap: 40,
            flexWrap: "wrap",
          }}
        >
          {/* Brand */}
          <div style={{ maxWidth: 300 }}>
            <div style={{ position: "relative", width: 44, height: 44, marginBottom: 16 }}>
              <Image
                src="/logo.png"
                alt={`${brandName} Logo`}
                fill
                className="object-contain"
              />
            </div>
            <p
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: 13,
                color: "rgba(255,255,255,0.38)",
                lineHeight: 1.7,
              }}
            >
              {get(
                ["footer", "tagline"],
                "Prowadzimy Cię od pierwszej rozmowy aż do odebrania kluczy. Bez pośpiechu i bez ukrytych prowizji."
              )}
            </p>
          </div>

          {/* Navigation links */}
          <div className="gd-footer-links" style={{ display: "flex", gap: 64, flexWrap: "wrap" }}>
            <div>
              <div className="gd-label" style={{ color: "var(--gd-gold)", marginBottom: 20 }}>
                {get(["realEstateServicesTitle"], "Usługi")}
              </div>
              {navLinks.map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  style={{
                    display: "block",
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: 13,
                    color: "rgba(255,255,255,0.38)",
                    textDecoration: "none",
                    marginBottom: 10,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color =
                      "rgba(255,255,255,0.75)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color =
                      "rgba(255,255,255,0.38)")
                  }
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div
          className="gd-footer-bottom"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: 12,
              color: "rgba(255,255,255,0.22)",
            }}
          >
            {get(
              ["footer", "copyright"],
              `© ${new Date().getFullYear()} GRAND DOM. Wszelkie prawa zastrzeżone.`
            )}
          </p>
          <p
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: 12,
              color: "rgba(255,255,255,0.22)",
            }}
          >
            Warszawa, Polska
          </p>
        </div>
      </div>
    </footer>
  );
}

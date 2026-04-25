"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header({
  brandName,
  languages,
  currentLanguage,
  switchLanguage,
  get,
}: any) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onDocClick = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [menuOpen]);

  const isLight = scrolled || menuOpen;
  const textColor = isLight ? "var(--gd-ink)" : "#ffffff";

  const navItems = [
    { label: get(["nav", "services"], "Usługi"), href: "#services" },
    { label: get(["nav", "properties"], "Nieruchomości"), href: "#properties" },
    { label: get(["nav", "spain"], "Hiszpania"), href: "#spain" },
    { label: get(["nav", "contact"], "Kontakt"), href: "#contact" },
  ];

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      ref={headerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: isLight ? "rgba(255,255,255,0.97)" : "transparent",
        boxShadow: scrolled ? "0 1px 24px rgba(0,0,0,0.08)" : "none",
        borderBottom: isLight
          ? "1px solid var(--gd-border)"
          : "1px solid rgba(255,255,255,0.15)",
        transition: "background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease",
        padding: "0 clamp(20px, 5vw, 48px)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          height: 72,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
        }}
      >
        {/* Logo */}
        <a
          href="#hero"
          onClick={closeMenu}
          style={{ display: "flex", alignItems: "center", textDecoration: "none", flexShrink: 0 }}
        >
          <div style={{ position: "relative", width: 64, height: 64 }}>
            <Image src="/logo.png" alt={`${brandName} Logo`} fill priority className="object-contain" />
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="gd-nav-desktop" style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {navItems.map(({ label, href }) => (
            <a key={href} href={href} className="gd-nav-link" style={{ color: textColor, transition: "color 0.35s" }}>
              {label}
            </a>
          ))}
          <a
            href="#contact"
            style={{
              background: "var(--gd-gold)",
              color: "#fff",
              textDecoration: "none",
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              padding: "10px 22px",
              borderRadius: 999,
              whiteSpace: "nowrap",
              boxShadow: "0 4px 14px -4px rgba(180,130,50,0.4)",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.82")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
          >
            {get(["nav", "ctaLabel"], get(["contact", "getInTouch"], "Napisz do nas"))}
          </a>
          <LanguageSwitcher
            languages={languages}
            currentLanguage={currentLanguage}
            switchLanguage={switchLanguage}
            dark={!isLight}
          />
        </nav>

        {/* Mobile: lang switcher + hamburger */}
        <div className="gd-nav-mobile" style={{ display: "none", alignItems: "center", gap: 10 }}>
          <LanguageSwitcher
            languages={languages}
            currentLanguage={currentLanguage}
            switchLanguage={switchLanguage}
            dark={!isLight}
          />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Zamknij menu" : "Otwórz menu"}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "6px",
              color: textColor,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "color 0.35s",
            }}
          >
            {menuOpen ? (
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M3 3l16 16M19 3L3 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div style={{ borderTop: "1px solid var(--gd-border)", padding: "8px clamp(20px, 5vw, 48px) 28px" }}>
          {navItems.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={closeMenu}
              style={{
                display: "block",
                padding: "14px 0",
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: 15,
                fontWeight: 400,
                color: "var(--gd-ink)",
                textDecoration: "none",
                borderBottom: "1px solid var(--gd-border)",
                letterSpacing: "0.02em",
              }}
            >
              {label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={closeMenu}
            style={{
              display: "block",
              marginTop: 20,
              background: "var(--gd-gold)",
              color: "#fff",
              textDecoration: "none",
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: "0.04em",
              padding: "14px 24px",
              borderRadius: 999,
              textAlign: "center",
            }}
          >
            {get(["nav", "ctaLabel"], get(["contact", "getInTouch"], "Napisz do nas"))}
          </a>
        </div>
      )}
    </header>
  );
}

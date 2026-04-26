import Link from "next/link";

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--gd-cream)",
        padding: "40px 20px",
        textAlign: "center",
      }}
    >
      <div
        className="gd-heading"
        style={{
          fontSize: "clamp(80px, 14vw, 160px)",
          color: "var(--gd-teal)",
          fontWeight: 300,
          lineHeight: 1,
          marginBottom: 16,
        }}
      >
        404
      </div>
      <h1
        className="gd-heading"
        style={{
          fontSize: "clamp(28px, 4vw, 40px)",
          color: "var(--gd-ink)",
          fontWeight: 300,
          marginBottom: 16,
        }}
      >
        Strona nie znaleziona
      </h1>
      <p
        style={{
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize: 15,
          color: "var(--gd-muted)",
          maxWidth: 460,
          lineHeight: 1.7,
          marginBottom: 32,
        }}
      >
        Strona, której szukasz, nie istnieje lub została przeniesiona.
        <br />
        The page you are looking for does not exist.
      </p>
      <Link
        href="/pl"
        style={{
          background: "var(--gd-gold)",
          color: "#fff",
          textDecoration: "none",
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize: 12,
          fontWeight: 500,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          padding: "14px 28px",
          borderRadius: 999,
          boxShadow: "0 4px 14px -4px rgba(180,130,50,0.4)",
        }}
      >
        Powrót na stronę główną
      </Link>
    </main>
  );
}

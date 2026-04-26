"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

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
      <h1
        className="gd-heading"
        style={{
          fontSize: "clamp(28px, 4vw, 44px)",
          color: "var(--gd-ink)",
          fontWeight: 300,
          marginBottom: 16,
        }}
      >
        Coś poszło nie tak
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
        Wystąpił nieoczekiwany błąd. Spróbuj ponownie za chwilę.
        <br />
        Something went wrong. Please try again.
      </p>
      <button
        onClick={() => reset()}
        style={{
          background: "var(--gd-teal)",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize: 12,
          fontWeight: 500,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          padding: "14px 28px",
          borderRadius: 999,
          boxShadow: "0 4px 14px -4px rgba(20,60,40,0.4)",
        }}
      >
        Spróbuj ponownie
      </button>
    </main>
  );
}

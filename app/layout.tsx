import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://granddom.com"),
  title: {
    template: "%s | GRAND DOM",
    default: "GRAND DOM — Real Estate Agency Warsaw",
  },
  description:
    "GRAND DOM — real estate agency in Warsaw. We specialize in apartment sales, purchases and long-term rentals in Warsaw and Masovia. Investments in Spain.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lng: string };
}) {
  return (
    <html lang={params.lng ?? "pl"}>
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  );
}

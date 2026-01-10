"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Building2 } from "lucide-react";
import LanguageSwitcher from "../LanguageSwitcher";
import HeroSection from "../HeroSection";
import RealEstateServicesSection from "../RealEstateServicesSection";
import PropertyShowcaseSection from "../PropertyShowcaseSection";
import SpanishInvestmentSection from "../SpanishInvestmentSection";
import FooterSection from "../FooterSection";
import { safeGet } from "@/lib/safeGet";
import { useI18nSwitcher } from "@/hooks/useI18nSwitcher";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";

export default function GrandDomVisitCard({ messages }: { messages: any }) {
  const [showLanguages, setShowLanguages] = useState(false);

  const languages = safeGet(
    messages,
    ["languages", "available"],
    [
      { code: "pl", name: "Polski", flag: "🇵🇱" },
      { code: "ua", name: "Українська", flag: "🇺🇦" },
      { code: "en", name: "English", flag: "🇬🇧" },
    ]
  );

  const { currentLanguage, switchLanguage, router } =
    useI18nSwitcher(languages);
  const { copied, copyToClipboard } = useCopyToClipboard(2000);

  const get = (path: string[], fallback?: any) =>
    safeGet(messages, path, fallback);

  const realEstateServices = get(
    ["realEstateServices"],
    [
      {
        icon: Building2,
        title: "Sprzedaż Mieszkań w Warszawie",
        description:
          "Kompleksowa obsługa sprzedaży mieszkań, domów i lokali komercyjnych w Warszawie i województwie mazowieckim.",
        features: [
          "Wycena nieruchomości",
          "Marketing i promocja",
          "Obsługa prawna",
        ],
      },
    ]
  );

  const contactEmail = get(["contact", "email", "value"], "granddom7@op.pl");
  const contactPhone = get(["contact", "phone", "value"], "886 193 598");
  const contactLocation = get(
    ["contact", "location", "value"],
    "Warszawa, Polska"
  );
  const contactWebsite = get(
    ["contact", "website", "value"],
    "www.granddom.com"
  );
  const contactGetInTouch = get(
    ["contact", "getInTouch"],
    "Skontaktuj się z nami"
  );

  const badgeText = get(["badge", "new"], "Biuro Nieruchomości");
  const brandName = get(["brand", "name"], "GRAND DOM");
  const heroSubheading = get(
    ["hero", "subheading"],
    "Twój Dom w Sercu Warszawy"
  );
  const heroText =
    get(["hero", "text"]) ??
    get(["hero", "description"]) ??
    "Świeże podejście do rynku nieruchomości. Specjalizujemy się w sprzedaży, kupnie i wynajmie nieruchomości.";
  const ctaStart = get(["cta", "startProject"], "Rozpocznij Współpracę");
  const ctaViewProperties = get(
    ["cta", "viewProperties"],
    "Zobacz Dostępne Nieruchomości"
  );
  const ctaLearnSpain = get(
    ["cta", "learnSpain"],
    "Dowiedz się więcej o Hiszpanii"
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100">
      {/* Language Switcher - Fixed Position */}
      <div className="fixed top-4 right-4 z-50">
        <LanguageSwitcher
          showLanguages={showLanguages}
          setShowLanguages={setShowLanguages}
          languages={languages}
          currentLanguage={currentLanguage}
          switchLanguage={(code) => {
            switchLanguage(code);
            setShowLanguages(false);
          }}
        />
      </div>

      {/* Hero Section with Property Background */}
      <HeroSection
        brandName={brandName}
        badgeText={badgeText}
        heroSubheading={heroSubheading}
        heroText={heroText}
        contactGetInTouch={contactGetInTouch}
        contactEmail={contactEmail}
        contactPhone={contactPhone}
        contactLocation={contactLocation}
        contactWebsite={contactWebsite}
        get={get}
        router={router}
        currentLanguage={currentLanguage}
        ctaStart={ctaStart}
      />

      {/* Real Estate Services Section */}
      <RealEstateServicesSection
        get={get}
        realEstateServices={realEstateServices}
        router={router}
        currentLanguage={currentLanguage}
      />

      {/* Property Showcase Section */}
      <PropertyShowcaseSection
        get={get}
        router={router}
        currentLanguage={currentLanguage}
        ctaViewProperties={ctaViewProperties}
      />

      {/* Spanish Investment Highlight */}
      <SpanishInvestmentSection
        get={get}
        router={router}
        currentLanguage={currentLanguage}
        ctaLearnSpain={ctaLearnSpain}
      />

      {/* Footer */}
      <FooterSection get={get} brandName={brandName} />

      {/* screen-reader announcements for copy */}
      <div aria-live="polite" className="sr-only">
        {copied === "email"
          ? get(
              ["contact", "email", "copySuccess"],
              "Adres email został skopiowany"
            )
          : copied === "phone"
          ? get(
              ["contact", "phone", "copySuccess"],
              "Numer telefonu został skopiowany"
            )
          : ""}
      </div>
    </div>
  );
}

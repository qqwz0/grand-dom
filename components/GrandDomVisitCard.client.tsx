"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRouter, usePathname } from "next/navigation";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Twitter,
  Instagram,
  Building2,
  Sparkles,
  ArrowRight,
  Copy,
  Check,
  Users,
  TrendingUp,
  Target,
  Lightbulb,
  Shield,
  Eye,
  Heart,
  Zap,
  Languages,
  ChevronDown,
  Sun,
} from "lucide-react";
import Image from "next/image";

export default function GrandDomVisitCard({ messages }: { messages: any }) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [showLanguages, setShowLanguages] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // helper: safe access with fallback
  const get = (path: string[], fallback: any = undefined) =>
    path.reduce(
      (acc: any, k) => (acc && acc[k] !== undefined ? acc[k] : undefined),
      messages
    ) ?? fallback;

  const copyToClipboard = async (text: string, type: "email" | "phone") => {
    try {
      if (!text) return;
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        // fallback
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "absolute";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }

      if (type === "email") {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      } else {
        setCopiedPhone(true);
        setTimeout(() => setCopiedPhone(false), 2000);
      }
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const languages = get(
    ["languages", "available"],
    [
      { code: "pl", name: "Polski", flag: "🇵🇱" },
      { code: "ua", name: "Українська", flag: "🇺🇦" },
      { code: "en", name: "English", flag: "🇬🇧" },
    ]
  );

  const currentLanguage =
    languages.find((lang: any) => pathname?.includes(`/${lang.code}`)) ||
    languages[0];

  const switchLanguage = (langCode: string) => {
    const newPath =
      pathname?.replace(/\/(pl|ua)/, `/${langCode}`) || `/${langCode}`;
    router.push(newPath);
    setShowLanguages(false);
  };

  // Services list: support messages.services.list or messages.specialization.items
  const servicesList = get(["services", "list"]) ??
    get(["specialization", "items"]) ?? [
      "Sprzedaż Mieszkań",
      "Kupno Nieruchomości",
      "Wynajem Długoterminowy",
      "Doradztwo Inwestycyjne",
      "Obsługa Prawna",
      "Inwestycje Hiszpańskie",
    ];

  // Real estate services from messages.realEstateServices or fallback to empty array
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

  // Values from messages.values.items or fallback
  const values = get(
    ["values", "items"],
    [
      {
        icon: Target,
        title: "Doskonałość",
        description:
          "Dążymy do perfekcji w każdym projekcie, dostarczając rezultaty przewyższające oczekiwania.",
      },
      {
        icon: Shield,
        title: "Uczciwość",
        description:
          "Zaufanie i transparentność stanowią fundament wszystkich naszych relacji z klientami.",
      },
      {
        icon: Lightbulb,
        title: "Innowacyjność",
        description:
          "Wykorzystujemy najnowsze technologie i kreatywne rozwiązania do rozwiązywania złożonych wyzwań.",
      },
      {
        icon: Users,
        title: "Współpraca",
        description:
          "Sukces osiągamy poprzez partnerstwo, pracę zespołową i zrozumienie unikalnych potrzeb klientów.",
      },
    ]
  );

  // contact fields
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

  // badge, brand, hero, cta, stats, footer
  const badgeText = get(["badge", "new"], "Nowa Agencja");
  const brandName = get(["brand", "name"], "GrandDom");
  const brandTagline = get(["brand", "tagline"], "");
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

  const propertyShowcase = get(["propertyShowcase"], undefined);
  const spanish = get(["spanishInvestment"], undefined);
  const statsItems = get(
    ["stats", "items"],
    [
      { value: "2024", label: "Rok założenia" },
      { value: "100%", label: "Zadowolenie klientów" },
      { value: "24/7", label: "Dostępne wsparcie" },
      { value: "∞", label: "Możliwości" },
    ]
  );

  // social links
  const social = get(["social", "links"], {
    linkedin: "#",
    twitter: "#",
    instagram: "#",
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100">
      {/* Language Switcher - Fixed Position */}
      <div className="fixed top-4 right-4 z-50">
        <div className="relative">
          <Button
            variant="outline"
            size="sm"
            className="bg-white/90 backdrop-blur-sm border-green-200 text-gray-700 hover:bg-white hover:border-green-300 transition-all duration-200 shadow-lg"
            onClick={() => setShowLanguages(!showLanguages)}
          >
            <Languages className="h-4 w-4 mr-2" />
            <span className="mr-1">{currentLanguage.flag}</span>
            <span className="mr-1">{currentLanguage.name}</span>
            <ChevronDown
              className={`h-3 w-3 transition-transform ${
                showLanguages ? "rotate-180" : ""
              }`}
            />
          </Button>

          {showLanguages && (
            <Card className="absolute top-full mt-2 right-0 w-48 bg-white/95 backdrop-blur-sm border-green-200 shadow-xl">
              <CardContent className="p-2">
                {languages.map((language: any) => (
                  <Button
                    key={language.code}
                    variant={
                      currentLanguage.code === language.code
                        ? "default"
                        : "ghost"
                    }
                    size="sm"
                    className={`w-full justify-start mb-1 last:mb-0 transition-colors ${
                      currentLanguage.code === language.code
                        ? "bg-green-500 text-white hover:bg-green-600"
                        : "text-gray-700 hover:bg-green-50"
                    }`}
                    onClick={() => switchLanguage(language.code)}
                  >
                    <span className="mr-3 text-lg">{language.flag}</span>
                    {language.name}
                  </Button>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Hero Section with Property Background */}
      <section className="min-h-screen flex items-center justify-center p-4 relative">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-property.jpg"
            alt="Elegant property interior"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-green-100/80 via-emerald-100/80 to-teal-100/80" />
        </div>

        <div className="w-full max-w-4xl relative z-10">
          <Card className="relative overflow-hidden bg-white/80 backdrop-blur-lg border-green-200 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-teal-500/10" />
            <CardContent className="relative p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Left Side - Company Info */}
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12">
                        <Image
                          src="/logo.png"
                          alt={`${brandName} Logo`}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <Badge className="bg-green-100 text-green-700 border-green-300">
                        {badgeText}
                      </Badge>
                    </div>

                    <div>
                      <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                        {brandName}
                      </h1>
                      <p className="text-xl text-gray-600 mt-2">
                        {heroSubheading}
                      </p>
                    </div>

                    <p className="text-gray-700 leading-relaxed">{heroText}</p>
                  </div>

                  {/* Services */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-green-500" />
                      {get(["services", "title"]) ??
                        get(["specialization", "title"]) ??
                        "Nasza Specjalizacja"}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {servicesList.map((service: string) => (
                        <Badge
                          key={service}
                          variant="outline"
                          className="border-green-300 text-green-700 hover:bg-green-50 transition-colors"
                        >
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Side - Contact Info */}
                <div className="space-y-6">
                  <Card className="bg-green-50/90 border-green-200 backdrop-blur-sm">
                    <CardContent className="p-6 space-y-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        {contactGetInTouch}
                      </h3>

                      {/* Email */}
                      <div className="flex items-center justify-between group">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-green-100 rounded-lg">
                            <Mail className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">
                              {get(["contact", "email", "label"], "Email")}
                            </p>
                            <p className="text-gray-800">{contactEmail}</p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-green-400 hover:text-green-300"
                          onClick={() => copyToClipboard(contactEmail, "email")}
                        >
                          {copiedEmail ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>

                      {/* Phone */}
                      <div className="flex items-center justify-between group">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-teal-100 rounded-lg">
                            <Phone className="h-4 w-4 text-teal-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">
                              {get(["contact", "phone", "label"], "Telefon")}
                            </p>
                            <p className="text-gray-800">{contactPhone}</p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-teal-400 hover:text-teal-300"
                          onClick={() => copyToClipboard(contactPhone, "phone")}
                        >
                          {copiedPhone ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>

                      {/* Location */}
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-100 rounded-lg">
                          <MapPin className="h-4 w-4 text-emerald-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">
                            {get(
                              ["contact", "location", "label"],
                              "Lokalizacja"
                            )}
                          </p>
                          <p className="text-gray-800">{contactLocation}</p>
                        </div>
                      </div>

                      {/* Website */}
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-lime-100 rounded-lg">
                          <Globe className="h-4 w-4 text-lime-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">
                            {get(
                              ["contact", "website", "label"],
                              "Strona internetowa"
                            )}
                          </p>
                          <p className="text-gray-800">{contactWebsite}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Social Links */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {get(["social", "title"], "Znajdź nas w mediach")}
                    </h3>
                    <div className="flex gap-3">
                      {[
                        {
                          Icon: Linkedin,
                          href: social?.linkedin ?? "#",
                          label: "LinkedIn",
                        },
                        {
                          Icon: Twitter,
                          href: social?.twitter ?? "#",
                          label: "Twitter",
                        },
                        {
                          Icon: Instagram,
                          href: social?.instagram ?? "#",
                          label: "Instagram",
                        },
                      ].map(({ Icon, href, label }) => (
                        <a
                          key={label}
                          href={href || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={label}
                        >
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-gray-300 text-gray-700 hover:text-white transition-colors"
                          >
                            <Icon className="h-4 w-4" />
                          </Button>
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Button
                    onClick={() =>
                      router.push(`/${currentLanguage.code}/contact`)
                    }
                    className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-semibold py-3 transition-all duration-300 transform hover:scale-105"
                  >
                    {ctaStart}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Real Estate Services Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sparkles className="h-8 w-8 text-green-500" />
              <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                {get(["realEstateServicesTitle"], "Nasze Usługi")}
              </h2>
            </div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              {get(
                ["realEstateServicesSubtitle"],
                "Kompleksowe rozwiązania dostosowane do Twoich potrzeb na warszawskim rynku nieruchomości."
              )}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {realEstateServices.map((service: any) => {
              const Icon = service.icon ?? Building2;
              return (
                <Card
                  key={service.title}
                  className="bg-white/60 border-green-200 backdrop-blur-sm hover:bg-white/80 transition-all duration-300 group"
                >
                  <CardContent className="p-6">
                    <div className="p-3 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.features?.map((feature: string) => (
                        <li
                          key={feature}
                          className="flex items-center gap-2 text-sm text-gray-600"
                        >
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Eye className="h-8 w-8 text-green-500" />
              <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                {get(["visionMission", "title"], "Nasza Wizja i Misja")}
              </h2>
            </div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              {get(
                ["visionMission", "intro"],
                "Jako nowa firma, kierujemy się ambitnymi celami i jasną wizją przyszłości."
              )}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-white/60 border-green-200 backdrop-blur-sm hover:bg-white/80 transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg">
                    <Eye className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    {get(["visionMission", "visionHeading"], "Nasza Wizja")}
                  </h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {get(
                    ["visionMission", "visionText"],
                    "Stać się wiodącą agencją nieruchomości w Warszawie..."
                  )}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/60 border-green-200 backdrop-blur-sm hover:bg-white/80 transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-lg">
                    <Heart className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    {get(["visionMission", "missionHeading"], "Nasza Misja")}
                  </h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {get(
                    ["visionMission", "missionText"],
                    "Dostarczanie wyjątkowych usług w zakresie nieruchomości..."
                  )}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Future Goals */}
          <div className="grid md:grid-cols-3 gap-6">
            {(
              get(
                ["futureGoals"],
                [
                  {
                    title: "Lider w Warszawie",
                    description: "Stać się rozpoznawalną marką...",
                  },
                ]
              ) as any[]
            ).map((goal: any) => (
              <Card
                key={goal.title}
                className="bg-white/60 border-green-200 backdrop-blur-sm hover:bg-white/80 transition-all duration-300 group text-center"
              >
                <CardContent className="p-6">
                  <div className="p-3 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg w-fit mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    {goal.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {goal.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Property Showcase Section */}
      <section className="py-20 px-4 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Building2 className="h-8 w-8 text-green-500" />
              <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                {get(
                  ["propertyShowcase", "heading"],
                  "Ekskluzywne Nieruchomości"
                )}
              </h2>
            </div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              {get(
                ["propertyShowcase", "subtitle"],
                "Odkryj wyjątkowe nieruchomości..."
              )}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/hero-property.jpg"
                alt="Eleganckie wnętrze nieruchomości"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800">
                {get(
                  ["propertyShowcase", "title"],
                  "Eleganckie Wnętrza, Wyjątkowa Jakość"
                )}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {get(
                  ["propertyShowcase", "description"],
                  "Nasze nieruchomości charakteryzują się najwyższą jakością..."
                )}
              </p>
              <div className="grid grid-cols-2 gap-4">
                {(get(["propertyShowcase", "featureStats"], []) as any[]).map(
                  (s, i) => (
                    <div
                      key={i}
                      className={`text-center p-4 ${
                        i === 0 ? "bg-green-50" : "bg-teal-50"
                      } rounded-lg`}
                    >
                      <div
                        className={`text-2xl font-bold ${
                          i === 0 ? "text-green-600" : "text-teal-600"
                        }`}
                      >
                        {s.value}
                      </div>
                      <div className="text-sm text-gray-600">{s.label}</div>
                    </div>
                  )
                )}
              </div>
              <Button
                onClick={() => router.push(`/${currentLanguage.code}/contact`)}
                className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-semibold py-3"
              >
                {ctaViewProperties}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Spanish Investment Highlight */}
      <section className="py-20 px-4 bg-gradient-to-r from-orange-100 to-yellow-100">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="bg-white/80 border-orange-200 shadow-xl">
            <CardContent className="p-8">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Sun className="h-12 w-12 text-orange-500" />
                <h2 className="text-3xl font-bold text-gray-800">
                  {get(
                    ["spanishInvestment", "heading"],
                    "🇪🇸 Hiszpania - Inwestycja, która daje więcej!"
                  )}
                </h2>
              </div>
              <p className="text-lg text-gray-700 mb-6">
                {get(
                  ["spanishInvestment", "intro"],
                  "Oprócz naszych głównych usług w Warszawie, oferujemy wyjątkową możliwość inwestowania w słonecznej Hiszpanii!"
                )}
              </p>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-800">
                    {get(
                      ["spanishInvestment", "offersTitle"],
                      "✅ Co oferujemy:"
                    )}
                  </h4>
                  <ul className="space-y-2 text-gray-600">
                    {(get(["spanishInvestment", "offers"], []) as string[]).map(
                      (o, i) => (
                        <li key={i}>• {o}</li>
                      )
                    )}
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-800">
                    {get(
                      ["spanishInvestment", "benefitsTitle"],
                      "🌞 Dodatkowe korzyści:"
                    )}
                  </h4>
                  <ul className="space-y-2 text-gray-600">
                    {(
                      get(["spanishInvestment", "benefits"], []) as string[]
                    ).map((b, i) => (
                      <li key={i}>• {b}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <Button
                onClick={() => router.push(`/${currentLanguage.code}/contact`)}
                className="mt-6 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold px-8 py-3"
              >
                {ctaLearnSpain}
                <Sun className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
              {get(["values", "heading"], "Nasze Wartości")}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {get(
                ["values", "subtitle"],
                "Zasady, które kierują wszystkim, co robimy i definiują nas jako firmę."
              )}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value: any) => {
              const Icon = value.icon ?? Target;
              return (
                <Card
                  key={value.title}
                  className="bg-white/60 border-green-200 backdrop-blur-sm hover:bg-white/80 transition-all duration-300 group"
                >
                  <CardContent className="p-6 text-center">
                    <div className="p-3 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg w-fit mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white/60 border-green-200 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {statsItems.map((s: any) => (
                  <div key={s.label}>
                    <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-2">
                      {s.value}
                    </div>
                    <p className="text-gray-600 text-sm">{s.label}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-green-200">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="relative w-8 h-8">
              <Image
                src="/logo.png"
                alt={`${brandName} Logo`}
                fill
                className="object-contain"
              />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              {brandName}
            </span>
          </div>
          <p className="text-gray-600">
            {get(
              ["footer", "copyright"],
              `© ${new Date().getFullYear()} ${brandName}. Gotowi, aby zmieniać rzeczywistość.`
            )}
          </p>
          <p className="text-gray-500 text-sm">
            {get(
              ["footer", "tagline"],
              "Twoje marzenia są naszym zadaniem - od pierwszego kontaktu aż do przekazania kluczy."
            )}
          </p>
        </div>
      </footer>

      {/* screen-reader announcements for copy */}
      <div aria-live="polite" className="sr-only">
        {copiedEmail
          ? get(
              ["contact", "email", "copySuccess"],
              "Adres email został skopiowany"
            )
          : copiedPhone
          ? get(
              ["contact", "phone", "copySuccess"],
              "Numer telefonu został skopiowany"
            )
          : ""}
      </div>
    </div>
  );
}

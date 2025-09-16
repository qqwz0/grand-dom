"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Send,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  Languages,
  ChevronDown,
  Copy,
  Check,
} from "lucide-react";
import Image from "next/image";

interface ContactPageProps {
  messages: any; // or create a proper type if you want strict typing
}

export default function ContactPage({ messages }: ContactPageProps) {
  const router = useRouter();
  const pathname = usePathname() || "/";
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState<null | "email" | "phone">(null);
  const [showLanguages, setShowLanguages] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    budget: "",
    message: "",
    timeline: "",
  });

  // Safe accessor
  const get = (path: string[], fallback: any = undefined) =>
    path.reduce(
      (acc: any, k) => (acc && acc[k] !== undefined ? acc[k] : undefined),
      messages
    ) ?? fallback;

  // Languages (from messages or fallback)
  const languages: { code: string; name: string; flag?: string }[] = get(
    ["languages", "available"],
    [
      { code: "pl", name: "Polski", flag: "🇵🇱" },
      { code: "en", name: "English", flag: "🇬🇧" },
      { code: "ua", name: "Українська", flag: "🇺🇦" },
    ]
  );

  // Determine current language from pathname prefix (/pl, /en, /ua)
  const localeMatch = pathname.match(/^\/(pl|en|ua)(?=\/|$)/);
  const currentLanguage =
    languages.find((l) => l.code === (localeMatch?.[1] ?? languages[0].code)) ||
    languages[0];

  // preserve rest of the path when switching language
  const switchLanguage = (langCode: string) => {
    const stripped = pathname.replace(/^\/(pl|en|ua)/, "");
    const normalized = stripped.startsWith("/") ? stripped : `/${stripped}`;
    const newPath = `/${langCode}${normalized === "/" ? "" : normalized}`;
    router.push(newPath || `/${langCode}`);
    setShowLanguages(false);
  };

  // close dropdown on outside click or Escape
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setShowLanguages(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowLanguages(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  // clipboard helper with fallback
  const copyToClipboard = async (text: string, type: "email" | "phone") => {
    try {
      if (!text) return;
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
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
      setCopied(type);
      setTimeout(() => setCopied((c) => (c === type ? null : c)), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  const handleInputChange = (field: string, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Replace with real submission logic (API call / webhook)
    await new Promise((r) => setTimeout(r, 1500));

    setIsLoading(false);
    setIsSubmitted(true);
  };

  // localized strings with fallbacks
  const brandName = get(["brand", "name"], "GrandDom");
  const titleStart = get(
    ["contactPage", "title"],
    get(["cta", "startProject"], "Start Your Project")
  );
  const subtitle = get(
    ["contactPage", "subtitle"],
    "Tell us about your project and we'll get back to you with a customized solution."
  );
  const backToHome = get(["ui", "backToHome"], "Back to Home");

  // contact sidebar fields
  const sidebarEmail = get(
    ["contact", "email", "value"],
    get(["contact", "email"], "contact@granddom.com")
  );
  const sidebarPhone = get(
    ["contact", "phone", "value"],
    get(["contact", "phone"], "+1 (555) 123-4567")
  );
  const sidebarLocation = get(
    ["contact", "location", "value"],
    get(["contact", "location"], "New York, NY")
  );

  const submitSuccessTitle = get(["form", "successTitle"], "Thank You!");
  const submitSuccessText = get(
    ["form", "successText"],
    "We've received your project details and will contact you within 24 hours to discuss your requirements."
  );
  const sendBtn = get(["form", "send"], "Send Project Details");

  // select options (try to pull from messages; otherwise use sensible defaults)
  const serviceOptions = get(
    ["contactPage", "services"],
    [
      { value: "consulting", label: "Business Consulting" },
      { value: "development", label: "Development" },
      { value: "strategy", label: "Growth Strategy" },
      { value: "digital", label: "Digital Transformation" },
      { value: "ai", label: "AI Solutions" },
      { value: "other", label: "Other" },
    ]
  );

  const budgetOptions = get(
    ["contactPage", "budgets"],
    [
      { value: "5k-10k", label: "$5,000 - $10,000" },
      { value: "10k-25k", label: "$10,000 - $25,000" },
      { value: "25k-50k", label: "$25,000 - $50,000" },
      { value: "50k+", label: "$50,000+" },
      { value: "discuss", label: "Let's Discuss" },
    ]
  );

  const timelineOptions = get(
    ["contactPage", "timelines"],
    [
      { value: "asap", label: "ASAP" },
      { value: "1month", label: "Within 1 month" },
      { value: "3months", label: "Within 3 months" },
      { value: "6months", label: "Within 6 months" },
      { value: "flexible", label: "I'm flexible" },
    ]
  );

  // When submitted - localized thank-you screen
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white/80 border-green-200 shadow-2xl">
          <CardContent className="p-8 text-center">
            <div className="p-4 bg-green-100 rounded-full w-fit mx-auto mb-6">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {submitSuccessTitle}
            </h2>
            <p className="text-gray-600 mb-6">{submitSuccessText}</p>
            <Button
              onClick={() => router.push(get(["links", "home"], "/"))}
              className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white"
            >
              {backToHome}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100">
      {/* Language Switcher - Fixed Position */}
      <div className="fixed top-4 right-4 z-50">
        <div className="relative" ref={dropdownRef}>
          <Button
            variant="outline"
            size="sm"
            className="bg-white/90 backdrop-blur-sm border-green-200 text-gray-700 hover:bg-white hover:border-green-300 transition-all duration-200 shadow-lg"
            onClick={() => setShowLanguages((s) => !s)}
            aria-expanded={showLanguages}
            aria-haspopup="menu"
          >
            <Languages className="h-4 w-4 mr-2" />
            <span className="mr-1">
              {currentLanguage.flag ?? currentLanguage.code}
            </span>
            <span className="mr-1">{currentLanguage.name}</span>
            <ChevronDown
              className={`h-3 w-3 transition-transform ${
                showLanguages ? "rotate-180" : ""
              }`}
            />
          </Button>

          {showLanguages && (
            <div
              role="menu"
              className="absolute top-full mt-2 right-0 w-48 bg-white/95 backdrop-blur-sm border-green-200 shadow-xl"
            >
              <div className="p-2">
                {languages.map((language) => (
                  <Button
                    key={language.code}
                    role="menuitem"
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
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Header */}
      <header className="p-6 border-b border-green-200 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8">
              <Image
                src="/logo.png"
                alt={`${brandName} Logo`}
                fill
                className="object-contain"
              />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              {brandName}
            </span>
          </div>
          <Button
            variant="outline"
            onClick={() => router.push(get(["links", "home"], "/"))}
            className="border-green-300 text-green-700 hover:bg-green-50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {get(["ui", "backToHome"], "Back to Home")}
          </Button>
        </div>
      </header>

      <div className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
              {titleStart}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {subtitle}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="bg-white/70 border-green-200 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-800">
                    {get(["form", "title"], "Project Details")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    aria-label={get(
                      ["form", "ariaLabel"],
                      "Project details form"
                    )}
                  >
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-700">
                          {get(["form", "nameLabel"], "Full Name *")}
                        </Label>
                        <Input
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) =>
                            handleInputChange("name", e.target.value)
                          }
                          className="border-green-200 focus:border-green-500"
                          placeholder={get(
                            ["form", "namePlaceholder"],
                            "John Doe"
                          )}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-700">
                          {get(["form", "emailLabel"], "Email Address *")}
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          className="border-green-200 focus:border-green-500"
                          placeholder={get(
                            ["form", "emailPlaceholder"],
                            "john@example.com"
                          )}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-gray-700">
                          {get(["form", "phoneLabel"], "Phone Number")}
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                          className="border-green-200 focus:border-green-500"
                          placeholder={get(
                            ["form", "phonePlaceholder"],
                            "+1 (555) 123-4567"
                          )}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company" className="text-gray-700">
                          {get(["form", "companyLabel"], "Company Name")}
                        </Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) =>
                            handleInputChange("company", e.target.value)
                          }
                          className="border-green-200 focus:border-green-500"
                          placeholder={get(
                            ["form", "companyPlaceholder"],
                            "Your Company"
                          )}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="service" className="text-gray-700">
                          {get(["form", "serviceLabel"], "Service Needed *")}
                        </Label>
                        <Select
                          required
                          onValueChange={(value) =>
                            handleInputChange("service", value)
                          }
                        >
                          <SelectTrigger className="border-green-200 focus:border-green-500">
                            <SelectValue
                              placeholder={get(
                                ["form", "servicePlaceholder"],
                                "Select a service"
                              )}
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {serviceOptions.map((o: any) => (
                              <SelectItem key={o.value} value={o.value}>
                                {o.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="budget" className="text-gray-700">
                          {get(["form", "budgetLabel"], "Project Budget")}
                        </Label>
                        <Select
                          onValueChange={(value) =>
                            handleInputChange("budget", value)
                          }
                        >
                          <SelectTrigger className="border-green-200 focus:border-green-500">
                            <SelectValue
                              placeholder={get(
                                ["form", "budgetPlaceholder"],
                                "Select budget range"
                              )}
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {budgetOptions.map((b: any) => (
                              <SelectItem key={b.value} value={b.value}>
                                {b.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="timeline" className="text-gray-700">
                        {get(["form", "timelineLabel"], "Project Timeline")}
                      </Label>
                      <Select
                        onValueChange={(value) =>
                          handleInputChange("timeline", value)
                        }
                      >
                        <SelectTrigger className="border-green-200 focus:border-green-500">
                          <SelectValue
                            placeholder={get(
                              ["form", "timelinePlaceholder"],
                              "When do you need this completed?"
                            )}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {timelineOptions.map((t: any) => (
                            <SelectItem key={t.value} value={t.value}>
                              {t.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-gray-700">
                        {get(["form", "messageLabel"], "Project Description *")}
                      </Label>
                      <Textarea
                        id="message"
                        required
                        value={formData.message}
                        onChange={(e) =>
                          handleInputChange("message", e.target.value)
                        }
                        className="border-green-200 focus:border-green-500 min-h-[120px]"
                        placeholder={get(
                          ["form", "messagePlaceholder"],
                          "Tell us about your project, goals, and any specific requirements..."
                        )}
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-semibold py-3 transition-all duration-300"
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                          {get(["form", "submittingText"], "Submitting...")}
                        </>
                      ) : (
                        <>
                          {sendBtn} <Send className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info Sidebar */}
            <div className="space-y-6">
              <Card className="bg-white/70 border-green-200 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-800">
                    {get(["contact", "getInTouch"], "Get In Touch")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Mail className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">
                          {get(["contact", "email", "label"], "Email")}
                        </p>
                        <p className="text-gray-800">{sidebarEmail}</p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(sidebarEmail, "email")}
                    >
                      {copied === "email" ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-teal-100 rounded-lg">
                        <Phone className="h-5 w-5 text-teal-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">
                          {get(["contact", "phone", "label"], "Phone")}
                        </p>
                        <p className="text-gray-800">{sidebarPhone}</p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(sidebarPhone, "phone")}
                    >
                      {copied === "phone" ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-100 rounded-lg">
                      <MapPin className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">
                        {get(["contact", "location", "label"], "Location")}
                      </p>
                      <p className="text-gray-800">{sidebarLocation}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500 to-teal-500 text-white border-0 shadow-xl">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3">
                    {get(["whyChoose", "title"], "Why Choose GrandDom?")}
                  </h3>
                  <ul className="space-y-2 text-sm">
                    {(
                      get(
                        ["whyChoose", "items"],
                        [
                          get(
                            ["ui", "fastResponse"],
                            "24-hour response guarantee"
                          ),
                          get(
                            ["ui", "freeConsult"],
                            "Free initial consultation"
                          ),
                          get(["ui", "custom"], "Customized solutions"),
                          get(["ui", "expert"], "Expert team support"),
                        ]
                      ) as string[]
                    ).map((it: string, i: number) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* live region for screen readers */}
      <div aria-live="polite" className="sr-only">
        {copied === "email"
          ? get(["contact", "email", "copySuccess"], "Email address copied")
          : copied === "phone"
          ? get(["contact", "phone", "copySuccess"], "Phone number copied")
          : ""}
      </div>
    </div>
  );
}

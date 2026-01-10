"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import Header from "../Header";
import ContactForm from "../ContactForm";
import ContactInfoSidebar from "../ContactInfoSidebar";
import { safeGet } from "@/lib/safeGet";
import { useI18nSwitcher } from "@/hooks/useI18nSwitcher";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { motion, AnimatePresence } from "framer-motion";

interface ContactPageProps {
  messages: any;
}

export default function ContactPage({ messages }: ContactPageProps) {
  const dropdownRef = useRef<HTMLDivElement | null>(null);

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

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    type: "",
    message: "",
    timeline: "",
    price: "",
  });

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

  const handleInputChange = (field: string, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("https://formspree.io/f/xnnbewjw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) setIsSubmitted(true);
      else alert("Something went wrong. Please try again!");
    } catch (err) {
      console.error(err);
      alert("Submission failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const brandName = get(["brand", "name"], "GRAND DOM");

  const titleStart = get(
    ["contactPage", "title"],
    get(["cta", "startProject"], "Rozpocznij współpracę")
  );

  const subtitle = get(
    ["contactPage", "subtitle"],
    "Opowiedz nam o swoich potrzebach, a wrócimy do Ciebie z dopasowaną ofertą."
  );

  const backToHome = get(["ui", "backToHome"], "Wróć na stronę główną");

  const sidebarEmail = get(
    ["contact", "email", "value"],
    get(["contact", "email"], "granddom7@op.pl")
  );
  const sidebarPhone = get(
    ["contact", "phone", "value"],
    get(["contact", "phone"], "886 193 598")
  );
  const sidebarLocation = get(
    ["contact", "location", "value"],
    get(["contact", "location"], "Warszawa, Polska")
  );

  const submitSuccessTitle = get(["form", "successTitle"], "Dziękujemy!");
  const submitSuccessText = get(
    ["form", "successText"],
    "Otrzymaliśmy Twoje zgłoszenie i skontaktujemy się z Tobą w ciągu 24 godzin, aby omówić szczegóły."
  );

  const sendBtn = get(["form", "send"], "Wyślij zgłoszenie");

  const serviceOptions = get(
    ["contactPage", "services"],
    [
      { value: "selling", label: "Sprzedaż nieruchomości" },
      { value: "buying", label: "Zakup nieruchomości" },
      { value: "renting", label: "Wynajem" },
      { value: "investment", label: "Doradztwo inwestycyjne" },
      { value: "legal", label: "Obsługa prawna" },
      { value: "other", label: "Inne" },
    ]
  );

  const budgetOptions = get(
    ["contactPage", "type"],
    [
      { value: "buying", label: "Zakup (widełki cenowe)" },
      { value: "renting", label: "Wynajem (widełki miesięczne)" },
      { value: "investment", label: "Inwestycja" },
      { value: "consultation", label: "Konsultacja" },
      { value: "discuss", label: "Do ustalenia" },
    ]
  );

  const timelineOptions = get(
    ["contactPage", "timelines"],
    [
      { value: "asap", label: "Jak najszybciej" },
      { value: "1week", label: "W ciągu 1 tygodnia" },
      { value: "1month", label: "W ciągu 1 miesiąca" },
      { value: "3months", label: "W ciągu 3 miesięcy" },
      { value: "flexible", label: "Jestem elastyczny/a" },
    ]
  );

  const pricePlaceholders = get(["form", "pricePlaceholders"], {
    en: { buying: "e.g., 100000-250000", renting: "e.g., 500-1500" },
    ua: { buying: "нп., 100000-250000", renting: "наприклад, 500-1500" },
    pl: { buying: "np. 100000-250000", renting: "np. 500-1500" },
  });

  const priceHelperText = get(["form", "priceHelperText"], {
    en: {
      buying: "Enter total price range",
      renting: "Enter monthly price range",
    },
    ua: {
      buying: "Введіть загальний діапазон цін",
      renting: "Введіть щомісячний діапазон цін",
    },
    pl: {
      buying: "Wprowadź całkowity przedział cenowy",
      renting: "Wprowadź miesięczny przedział cenowy",
    },
  });

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
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
                onClick={() =>
                  router.push(`/${currentLanguage.code}/`, { scroll: false })
                }
                className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white"
              >
                {backToHome}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100">
      {/* Header (kept as-is) */}
      <Header
        brandName={brandName}
        currentLanguage={currentLanguage}
        router={router}
        get={get}
        showLanguages={showLanguages}
        setShowLanguages={setShowLanguages}
        languages={languages}
        switchLanguage={(code: any) => {
          switchLanguage(code);
          setShowLanguages(false);
        }}
      />

      <div className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
              {titleStart}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {subtitle}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              <ContactForm
                get={get}
                handleSubmit={handleSubmit}
                handleInputChange={handleInputChange}
                formData={formData}
                isLoading={isLoading}
                serviceOptions={serviceOptions}
                budgetOptions={budgetOptions}
                timelineOptions={timelineOptions}
                pricePlaceholders={pricePlaceholders}
                priceHelperText={priceHelperText}
                currentLanguage={currentLanguage}
                sendBtn={sendBtn}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              <ContactInfoSidebar
                get={get}
                sidebarEmail={sidebarEmail}
                sidebarPhone={sidebarPhone}
                sidebarLocation={sidebarLocation}
                // if your sidebar supports copy props, pass them:
                copyToClipboard={copyToClipboard}
                copiedEmail={copied === "email"}
                copiedPhone={copied === "phone"}
              />
            </motion.div>
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

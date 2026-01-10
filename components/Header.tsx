import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header({
  brandName,
  currentLanguage,
  router,
  get,
  showLanguages,
  setShowLanguages,
  languages,
  switchLanguage,
}: any) {
  return (
    <header className="p-6 border-b border-green-200 bg-white/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto flex items-start justify-between gap-3 md:items-center">
        {/* Left: logo + brand */}
        <div className="flex items-center gap-3 min-w-0 self-center">
          <div className="relative w-8 h-8 shrink-0">
            <Image
              src="/logo.png"
              alt={`${brandName} Logo`}
              fill
              className="object-contain"
            />
          </div>

          <span
            onClick={() =>
              router.push(`/${currentLanguage.code}/`, { scroll: false })
            }
            className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent cursor-pointer truncate"
          >
            {brandName}
          </span>
        </div>

        {/* Right: stacked on mobile, inline on md+ */}
        <div className="flex flex-col gap-2 w-min sm:w-52 md:w-auto md:flex-row md:items-center md:gap-3 shrink-0">
          <Button
            variant="outline"
            onClick={() =>
              router.push(`/${currentLanguage.code}/`, { scroll: false })
            }
            className="border-green-300 text-green-700 hover:bg-green-50 w-full md:w-auto"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {get(["ui", "backToHome"], "Back to Home")}
          </Button>

          {/* Make the switcher button match the same width on mobile */}
          <div className="w-full md:w-auto">
            <LanguageSwitcher
              currentLanguage={currentLanguage}
              showLanguages={showLanguages}
              setShowLanguages={setShowLanguages}
              languages={languages}
              switchLanguage={(code: any) => {
                switchLanguage(code);
                setShowLanguages(false);
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

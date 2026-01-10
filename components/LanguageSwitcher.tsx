import React from "react";
import { Button } from "./ui/button";
import { ChevronDown, Languages } from "lucide-react";
import { Card, CardContent } from "./ui/card";

export default function LanguageSwitcher({
  showLanguages,
  setShowLanguages,
  languages,
  currentLanguage,
  switchLanguage,
}: {
  showLanguages: boolean;
  setShowLanguages: (v: boolean) => void;
  languages: any[];
  currentLanguage: any;
  switchLanguage: (code: string) => void;
}) {
  return (
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
                  currentLanguage.code === language.code ? "default" : "ghost"
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
  );
}

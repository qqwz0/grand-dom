import React from "react";
import { Button } from "./ui/button";
import { ArrowRight, Building2 } from "lucide-react";
import Image from "next/image";

export default function PropertyShowcaseSection({
  get,
  router,
  currentLanguage,
  ctaViewProperties,
}: any) {
  return (
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
              src="/photo_2025-12-21_18-18-44.jpg"
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
              onClick={() =>
                router.push(`/${currentLanguage.code}/contact`, {
                  scroll: false,
                })
              }
              className="w-full bg-gradient-to-r cursor-pointer from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-semibold py-3"
            >
              {ctaViewProperties}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

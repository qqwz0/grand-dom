import React from "react";
import { Card, CardContent } from "./ui/card";
import { Sun } from "lucide-react";
import { Button } from "./ui/button";

export default function SpanishInvestmentSection({
  get,
  router,
  currentLanguage,
  ctaLearnSpain,
}: any) {
  return (
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
                  {(get(["spanishInvestment", "benefits"], []) as string[]).map(
                    (b, i) => (
                      <li key={i}>• {b}</li>
                    )
                  )}
                </ul>
              </div>
            </div>
            <Button
              onClick={() =>
                router.push(`/${currentLanguage.code}/contact`, {
                  scroll: false,
                })
              }
              className="mt-6 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold px-8 py-3"
            >
              {ctaLearnSpain}
              <Sun className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

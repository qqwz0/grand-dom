import React from "react";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  ArrowRight,
  Globe,
  Instagram,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import CopyButton from "./ui/copy-button";

export default function HeroSection({
  brandName,
  badgeText,
  heroSubheading,
  heroText,
  contactGetInTouch,
  contactEmail,
  contactPhone,
  contactLocation,
  contactWebsite,
  get,
  router,
  currentLanguage,
  ctaStart,
}: any) {
  return (
    <section
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        backgroundImage: "url('/photo_2025-10-09_22-28-44.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
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
                      <CopyButton contact={contactEmail} type={"email"} />
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
                      <CopyButton contact={contactPhone} type={"phone"} />
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-100 rounded-lg">
                        <MapPin className="h-4 w-4 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">
                          {get(["contact", "location", "label"], "Lokalizacja")}
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
                        Icon: Instagram,
                        href: "https://www.instagram.com/mieszkam.wa_wa",
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
                          className="border-gray-300 text-gray-700 hover:bg-gradient-to-tr hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 hover:text-white hover:border-transparent transition-all duration-900 cursor-pointer"
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
                    router.push(`/${currentLanguage.code}/contact`, {})
                  }
                  className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-semibold py-3 transition-all duration-300 transform hover:scale-105 cursor-pointer"
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
  );
}

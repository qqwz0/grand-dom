import Image from "next/image";
import React from "react";

export default function FooterSection({
  get,
  brandName,
}: {
  get: (path: string[], fallback?: any) => any;
  brandName: string;
}) {
  return (
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
  );
}

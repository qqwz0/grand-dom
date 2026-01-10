import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";

export default function Header({
  brandName,
  currentLanguage,
  router,
  get,
}: any) {
  return (
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
          <span
            onClick={() =>
              router.push(`/${currentLanguage.code}/`, {
                scroll: false,
              })
            }
            className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent cursor-pointer"
          >
            {brandName}
          </span>
        </div>
        <Button
          variant="outline"
          onClick={() =>
            router.push(`/${currentLanguage.code}/`, {
              scroll: false,
            })
          }
          className="border-green-300 text-green-700 hover:bg-green-50"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {get(["ui", "backToHome"], "Back to Home")}
        </Button>
      </div>
    </header>
  );
}

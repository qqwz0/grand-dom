import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Mail, Phone, MapPin, Copy, Check } from "lucide-react";

export default function ContactInfoSidebar({
  get,
  sidebarEmail,
  sidebarPhone,
  sidebarLocation,
  copyToClipboard,
  copiedEmail,
  copiedPhone,
}: any) {
  return (
    <div className="space-y-6">
      <Card className="bg-white/70 border-green-200 shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl text-gray-800">
            {get(["contact", "getInTouch"], "Get In Touch")}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* EMAIL */}
          <div className="group flex items-center justify-between">
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
              className="opacity-0 group-hover:opacity-100 transition-opacity text-green-400 hover:text-green-300"
              onClick={() => copyToClipboard(sidebarEmail, "email")}
            >
              {copiedEmail ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* PHONE */}
          <div className="group flex items-center justify-between">
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
              className="opacity-0 group-hover:opacity-100 transition-opacity text-teal-400 hover:text-teal-300"
              onClick={() => copyToClipboard(sidebarPhone, "phone")}
            >
              {copiedPhone ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* LOCATION */}
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
                  get(["ui", "fastResponse"], "24-hour response guarantee"),
                  get(["ui", "freeConsult"], "Free initial consultation"),
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
  );
}

"use client";

import React from "react";
import ContactPage from "../../contact/[lang]";
import pl from "../../../messages/pl/pl.json";
import ua from "../../../messages/ua/ua.json";
import en from "../../../messages/en/common.json";
import { usePathname } from "next/navigation";

const LOCALES: Record<string, any> = { pl, ua, en };

export default function Page() {
  const pathname = usePathname() || "/";
  const langMatch = pathname.match(/^\/(pl|en|ua)(?=\/|$)/);
  const lang = langMatch?.[1] ?? "en";
  const messages = LOCALES[lang] ?? LOCALES.en;

  return <ContactPage messages={messages} />;
}

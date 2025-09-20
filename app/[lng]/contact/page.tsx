"use client";

import React from "react";
import ContactPage from "../../../components/pages/Contact.client";
import pl from "../../../messages/pl/contact.json";
import ua from "../../../messages/ua/contact.json";
import en from "../../../messages/en/contact.json";
import { usePathname } from "next/navigation";

const LOCALES: Record<string, any> = { pl, ua, en };

export default function Page() {
  const pathname = usePathname() || "/";
  const langMatch = pathname.match(/^\/(pl|ua|en)(?=\/|$)/);
  const lang = langMatch?.[1] ?? "pl";
  const messages = LOCALES[lang] ?? LOCALES.en;

  return <ContactPage messages={messages} />;
}

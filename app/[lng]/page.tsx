import { notFound } from "next/navigation";
import GrandDomVisitCard from "../../components/pages/GrandDomVisitCard.client";
import {
  SUPPORTED_LOCALES,
  isValidLocale,
  getMessages,
  type SupportedLocale,
} from "@/lib/translations";
import { generatePageMetadata } from "@/lib/metadata";

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lng) => ({ lng }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lng: string }>;
}) {
  const { lng } = await params;

  if (!isValidLocale(lng)) {
    return {};
  }

  return generatePageMetadata(lng);
}

export default async function LocalePage({
  params,
}: {
  params: Promise<{ lng: string }>;
}) {
  const { lng } = await params;

  if (!isValidLocale(lng)) {
    notFound();
  }

  const msgs = await getMessages(lng);

  return <GrandDomVisitCard messages={msgs} />;
}

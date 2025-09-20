import {
  getMessages,
  SupportedLocale,
  generateLanguageAlternates,
} from "./translations";

export async function generatePageMetadata(
  lng: SupportedLocale,
  path: string = "",
  customTitle?: string
) {
  const commonMsgs = await getMessages(lng, "common");

  const baseTitle = commonMsgs.seo?.title || "GrandDom";
  const title = customTitle ? `${customTitle} - ${baseTitle}` : baseTitle;
  const description =
    commonMsgs.seo?.description || "Excellence in Every Domain";
  const fullPath = path ? `/${lng}${path}` : `/${lng}`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://granddom.com${fullPath}`,
      languages: generateLanguageAlternates(path),
    },
    openGraph: {
      title,
      description,
      locale: lng,
      type: "website" as const,
      url: `https://granddom.com${fullPath}`,
    },
  };
}

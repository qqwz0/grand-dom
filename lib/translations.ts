import fs from "fs/promises";
import path from "path";

export const SUPPORTED_LOCALES = ["pl", "ua", "en"] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];
export const DEFAULT_LOCALE: SupportedLocale = "pl";

export function isValidLocale(lng: string): lng is SupportedLocale {
  return SUPPORTED_LOCALES.includes(lng as SupportedLocale);
}

// Cache to avoid repeated file reads
const translationCache = new Map<string, any>();

export async function getMessages(
  lng: SupportedLocale,
  namespace: string = "common"
) {
  const cacheKey = `${lng}-${namespace}`;

  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey);
  }

  const file = path.join(process.cwd(), "messages", lng, `${namespace}.json`);

  try {
    const data = await fs.readFile(file, "utf8");
    const messages = JSON.parse(data);
    translationCache.set(cacheKey, messages);
    return messages;
  } catch (e) {
    console.error(`Error reading ${namespace}.json for ${lng}:`, e);
    // Fallback to English if current locale fails
    if (lng !== "en") {
      return getMessages("en", namespace);
    }
    return {};
  }
}

export function generateLanguageAlternates(path: string = "") {
  return Object.fromEntries(
    SUPPORTED_LOCALES.map((locale) => [
      locale,
      `https://granddom.com/${locale}${path}`,
    ])
  );
}

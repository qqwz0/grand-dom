import { SUPPORTED_LOCALES } from "@/lib/translations";

export default function sitemap() {
  const baseUrl = "https://granddom.com";

  const routes = ["", "/contact"];

  interface UrlEntry {
    url: string;
    lastModified: Date;
    changeFrequency:
      | "always"
      | "hourly"
      | "daily"
      | "weekly"
      | "monthly"
      | "yearly"
      | "never";
    priority: number;
  }

  const urls: UrlEntry[] = [];

  // Генеруємо URLs для всіх локалей та сторінок
  SUPPORTED_LOCALES.forEach((locale) => {
    routes.forEach((route) => {
      urls.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "daily" : "monthly",
        priority: route === "" ? 1 : 0.8,
      });
    });
  });

  return urls;
}

"use client";

import { useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";

export function useI18nSwitcher(languages: any[]) {
  const router = useRouter();
  const pathname = usePathname() || "/";

  const currentLanguage = useMemo(() => {
    return (
      languages.find((lang: any) => pathname.includes(`/${lang.code}`)) ||
      languages[0]
    );
  }, [languages, pathname]);

  const switchLanguage = (langCode: string) => {
    const langCodes = languages.map((lang: any) => lang.code);
    const regex = new RegExp(`^/(${langCodes.join("|")})`);

    const newPath = pathname.replace(regex, `/${langCode}`) || `/${langCode}`;
    router.push(newPath, { scroll: false });
  };

  return { router, pathname, currentLanguage, switchLanguage };
}

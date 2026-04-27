"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

const GTM_ID = "GTM-5WKRX4VF";
const STORAGE_KEY = "gd_cookie_consent_v1";
const CONSENT_EVENT = "gd_cookie_consent_change";

export default function GoogleTagManager() {
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const sync = () => {
      try {
        setAccepted(window.localStorage.getItem(STORAGE_KEY) === "accepted");
      } catch {
        setAccepted(false);
      }
    };

    sync();
    window.addEventListener(CONSENT_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(CONSENT_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  if (!accepted) return null;

  return (
    <Script id="gtm-loader" strategy="afterInteractive">
      {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
    </Script>
  );
}

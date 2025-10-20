export default function manifest() {
  return {
    name: "GrandDom - Excellence in Every Domain",
    short_name: "GrandDom",
    description: "Twój Dom w Sercu Warszawy",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}

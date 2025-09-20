import fs from "fs/promises";
import path from "path";
import GrandDomVisitCard from "../../components/pages/GrandDomVisitCard.client";

export async function generateStaticParams() {
  return [{ lng: "pl" }, { lng: "ua" }];
}

export async function generateMetadata({
  params,
}: {
  params: { lng: string };
}) {
  const { lng } = await params;
  const file = path.join(process.cwd(), "messages", lng, "common.json");

  let msgs: any = {};
  try {
    const data = await fs.readFile(file, "utf8");
    msgs = JSON.parse(data);
  } catch (e) {
    console.error(`Error reading localization file for ${lng}:`, e);
  }

  const title = msgs.seo?.title || "GrandDom";
  const description = msgs.seo?.description || "Excellence in Every Domain";

  return {
    title,
    description,
    alternates: {
      canonical: `https://granddom.com/${lng}`,
      languages: {
        pl: "https://granddom.com/pl",
        ua: "https://granddom.com/ua",
      },
    },
    openGraph: { title, description, locale: lng },
  };
}

export default async function LocalePage({
  params,
}: {
  params: { lng: string };
}) {
  const { lng } = await params;
  const file = path.join(process.cwd(), "messages", lng, "common.json");

  let msgs: any = {};
  try {
    const data = await fs.readFile(file, "utf8");
    msgs = JSON.parse(data);
  } catch (e) {
    console.error(`Error reading localization file for ${lng}:`, e);
  }

  return <GrandDomVisitCard messages={msgs} />;
}

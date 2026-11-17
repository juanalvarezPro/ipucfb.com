import type { Metadata, Viewport } from "next";
import { Oswald, Source_Sans_3 } from "next/font/google";
import { church, siteUrl } from "@/config/church";
import "./globals.css";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["300", "500", "600", "700"],
  variable: "--font-oswald",
  // «optional»: si la fuente no llega a tiempo en 4G lento, el título no se
  // vuelve a pintar (mejor LCP); queda en caché para la siguiente visita.
  display: "optional",
});

const title = `${church.shortName} · ${church.motto}`;
const description =
  "Iglesia Pentecostal Unida de Colombia. Horarios de cultos, lo que creemos, ministerios y peticiones de oración. ¡Te esperamos!";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: `%s · ${church.shortName}` },
  description,
  applicationName: church.shortName,
  keywords: ["IPUC", "iglesia pentecostal", "iglesia cristiana", "cultos", "oración", church.shortName],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: siteUrl,
    siteName: church.shortName,
    title,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#05070c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-CO" className={`${sourceSans.variable} ${oswald.variable}`}>
      <body>{children}</body>
    </html>
  );
}

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsappFab } from "@/components/whatsapp-fab";
import { Hero } from "@/components/sections/hero";
import { About, Beliefs, Ministries, PrayerSection, Schedule, VerseBanner, Visit } from "@/components/sections/content";
import { church, siteUrl } from "@/config/church";
import { getServices } from "@/lib/services";

export default async function Home() {
  const services = await getServices();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Church",
    name: church.name,
    alternateName: church.shortName,
    url: siteUrl,
    logo: `${siteUrl}/brand/icon-512.png`,
    slogan: church.motto,
    telephone: `+${church.whatsapp}`,
    email: church.email,
    address: { "@type": "PostalAddress", streetAddress: church.address.line, addressCountry: "CO" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <SiteHeader />
      <main>
        <Hero />
        <About />
        <Schedule services={services} />
        <Beliefs />
        <VerseBanner />
        <Ministries />
        <PrayerSection />
        <Visit />
      </main>
      <SiteFooter />
      <WhatsappFab />
    </>
  );
}

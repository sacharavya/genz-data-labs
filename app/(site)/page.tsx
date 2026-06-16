import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/sections/hero";
import { ClientMarquee } from "@/components/sections/client-marquee";
import { Thesis } from "@/components/sections/thesis";
import { Cases } from "@/components/sections/cases";
import { Services } from "@/components/sections/services";
import { Pricing } from "@/components/sections/pricing";
import { Stats } from "@/components/sections/stats";
import { Contact } from "@/components/sections/contact";
import { getFeaturedCaseStudies, getSiteSettings } from "@/lib/content";
import { SITE } from "@/lib/site";

export default async function Home() {
  const [settings, caseStudies] = await Promise.all([
    getSiteSettings(),
    getFeaturedCaseStudies(),
  ]);

  const cityTags =
    settings.cities && settings.cities.length > 0
      ? settings.cities
          .map((c) => c.tag)
          .filter(Boolean)
          .join(" / ")
      : SITE.cityTags;

  return (
    <>
      <SiteHeader variant="home" cityTags={cityTags} />
      <main>
        <Hero availability={settings.availabilityTag ?? SITE.availability} />
        <ClientMarquee />
        <Thesis />
        <Cases caseStudies={caseStudies} />
        <Services />
        {settings.pricing && settings.pricing.length > 0 && (
          <Pricing items={settings.pricing} note={settings.pricingNote} />
        )}
        <Stats stats={settings.statsBand ?? []} />
        <Contact email={settings.contactEmail} cities={settings.cities} />
      </main>
    </>
  );
}

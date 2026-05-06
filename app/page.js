import { getSiteContent } from "../lib/content-store.js";
import CtaSection from "../components/home/cta-section";
import HeroSection from "../components/home/hero-section";
import PhilosophySection from "../components/home/philosophy-section";
import ProblemsSection from "../components/home/problems-section";
import ProcessSection from "../components/home/process-section";
import ProjectsSection from "../components/home/projects-section";
import ServicesSection from "../components/home/services-section";
import SiteFooter from "../components/layout/site-footer";
import SiteHeader from "../components/layout/site-header";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const content = await getSiteContent();

  return (
    <main className="overflow-x-clip">
      <SiteHeader brand={content.brand} content={content.siteHeader} />
      <HeroSection content={content.hero} />
      <ProblemsSection content={content.problems} />
      <ProcessSection content={content.process} />
      <PhilosophySection content={content.philosophy} />
      <ServicesSection content={content.services} />
      <ProjectsSection content={content.projects} />
      <CtaSection content={content.cta} />
      <SiteFooter brand={content.brand} content={content.siteFooter} />
    </main>
  );
}

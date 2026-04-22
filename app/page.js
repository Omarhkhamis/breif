import CtaSection from "../components/home/cta-section";
import HeroSection from "../components/home/hero-section";
import PhilosophySection from "../components/home/philosophy-section";
import ProblemsSection from "../components/home/problems-section";
import ProcessSection from "../components/home/process-section";
import ProjectsSection from "../components/home/projects-section";
import ServicesSection from "../components/home/services-section";
import SiteFooter from "../components/layout/site-footer";
import SiteHeader from "../components/layout/site-header";

export default function HomePage() {
  return (
    <main className="overflow-x-clip">
      <SiteHeader />
      <HeroSection />
      <ProblemsSection />
      <ProcessSection />
      <PhilosophySection />
      <ServicesSection />
      <ProjectsSection />
      <CtaSection />
      <SiteFooter />
    </main>
  );
}

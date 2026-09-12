import { FeatureCard } from "@/components/FeatureCard";
import HomePageAnimationBG from "@/components/HomePageAnimationBG";
import { SiteHeader } from "@/components/SiteHeader";

import { SlidersHorizontal, BarChart3, UsersRound, BookOpen, Compass } from "lucide-react";
import LandingFeatureCards from "@/components/LandingFeatureCards";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return <main className="app-shell landing-shell">
    <SiteHeader landing />
    <section>
      <HomePageAnimationBG />
    </section>
    {/* <section className="feature-grid" id="about">
      <FeatureCard icon={<SlidersHorizontal size={22} />} title="Smart Filters" copy="Find what matches you" />
      <FeatureCard icon={<BarChart3 size={22} />} title="Detailed Insights" copy="Years, tech, topics & more" />
      <FeatureCard icon={<UsersRound size={22} />} title="Contributor Info" copy="Connect with community" />
      <FeatureCard icon={<BookOpen size={22} />} title="Past Projects" copy="Learn from real work" />
    </section> */}

    <LandingFeatureCards />

    <ContactSection />
    <section className="mini-guide" id="guide"><Compass size={19} /><span>Curated sample data today. Ready for an API, auth, and production data tomorrow.</span></section>
  </main>;
}

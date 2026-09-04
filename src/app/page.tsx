import { FeatureCard } from "@/components/FeatureCard";
import { GlowOrb } from "@/components/GlowOrb";
import { SiteHeader } from "@/components/SiteHeader";
import { ArrowRight, SlidersHorizontal, BarChart3, UsersRound, BookOpen, Compass } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return <main className="app-shell landing-shell">
    <SiteHeader landing />
    <section className="landing-hero">
      <div className="hero-copy">
        <span className="eyebrow"><span /> Open Source. Real Impact.</span>
        <h1>Find Your Perfect <em>GSoC Organization</em></h1>
        <p>Discover, explore and analyze organizations that participate in Google Summer of Code. Make data-driven decisions for your open-source journey.</p>
        <div className="hero-ctas"><Link href="/explore" className="primary-button">Explore Organizations <ArrowRight size={19} /></Link><Link href="/guide" className="secondary-button">Learn More</Link></div>
      </div>
      <GlowOrb />
    </section>
    <section className="feature-grid" id="about">
      <FeatureCard icon={<SlidersHorizontal size={22} />} title="Smart Filters" copy="Find what matches you" />
      <FeatureCard icon={<BarChart3 size={22} />} title="Detailed Insights" copy="Years, tech, topics & more" />
      <FeatureCard icon={<UsersRound size={22} />} title="Contributor Info" copy="Connect with community" />
      <FeatureCard icon={<BookOpen size={22} />} title="Past Projects" copy="Learn from real work" />
    </section>
    <section className="mini-guide" id="guide"><Compass size={19} /><span>Curated sample data today. Ready for an API, auth, and production data tomorrow.</span></section>
  </main>;
}

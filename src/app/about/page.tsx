"use client";

import { SiteHeader } from "@/components/SiteHeader";
import { ArrowRight, Search, BarChart3, UsersRound } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
    return <main className="app-shell about-shell">
        <SiteHeader />
        <section className="about-hero">
            <div>
                <span className="eyebrow">
                    <span />
                    ABOUT GSOC HUB
                </span>
                <h1>
                    Built for the
                    <em>
                        GSoC Community
                    </em>
                </h1>
                <p>
                    GSoC Hub is a modern platform to explore, analyze and discover organizations participating in Google Summer of Code.
                </p>
                <div className="hero-ctas">
                    <Link
                        href="/explore"
                        className="primary-button"
                    >
                        Start Exploring
                        <ArrowRight size={18} />
                    </Link>
                    <Link
                        href="/guide"
                        className="secondary-button"
                    >
                        Read the guide
                    </Link>
                </div>
            </div>
            <div
                className="about-globe-stage"
                role="img"
                aria-label="Connected open-source world globe"
            >
            </div>
        </section>
        <section className="value-grid">
            {[[Search, "Discover", "Explore organizations, projects and technologies with powerful search."], [BarChart3, "Analyze", "Turn history, tech stacks, and contribution data into useful context."], [UsersRound, "Connect", "Find organizations and contributors that align with your interests."]].map(([Icon, title, copy]) => { const Symbol = Icon as typeof Search; return <article key={title as string}><Symbol /><h2>{title as string}</h2><p>{copy as string}</p></article>; })}
        </section>
        <section className="stats-strip">
            <b>
                522+
                <small>
                    Organizations
                </small>
            </b>
            <b>
                2.1K+
                <small>
                    Projects
                </small>
            </b>
            <b>
                15.8K+
                <small>
                    Contributors
                </small>
            </b>
        </section>
    </main>;
}
"use client";

import { SiteHeader } from "@/components/SiteHeader";
import { ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function GuidePage() {
    const [step, setStep] = useState(0);
    const steps = ["Navigate the GSoC Universe", "Pick Your Perfect Fit", "Bring the Contributors", "Understand Active & Inactive", "Explore Like a Pro"];
    return <main className="app-shell guide-shell">
        <SiteHeader />
        <section className="guide-hero">
            <div>
                <span className="eyebrow">
                    <span />
                    GUIDE
                </span>
                <h1>
                    Your GSoC Journey
                    <em>
                        Made Simple
                    </em>
                </h1>
                <p>
                    A quick guide to help you get the best out of GSoC Hub. Find, filter and explore organizations that match your interests.
                </p>
                <Link
                    href="/explore"
                    className="primary-button"
                >
                    Start Exploring
                    <ArrowRight size={19} />
                </Link>
            </div>
            <div
                className="guide-illustration"
                role="img"
                aria-label="Student learning with code, plants, and open-source documentation"
            />
        </section>
        <section className="journey">
            {steps.map((item, index) => <button key={item} className={step === index ? "journey-step active" : "journey-step"} onClick={() => setStep(index)}><span>{index + 1}</span><strong>{item}</strong></button>)}
            <article className="journey-detail">
                <Sparkles size={18} />
                <p>
                    {["Start from a clear view of every participating organization.", "Use technologies, topics, and program years to narrow your shortlist.", "Review mentors, contributors, and past project patterns.", "Know whether an organization is currently active in the program.", "Turn what you discover into a confident project plan."][step]}
                </p>
            </article>
        </section>
    </main>;
}
"use client";

import { SiteHeader } from "@/components/SiteHeader";
import { UsersRound, Building2, Code2, Search, Star, ExternalLink } from "lucide-react";
import { useState } from "react";

import Pill from "@/components/Pill";

const contributorData = [
    ["Aarav Sharma", "Core Maintainer", "AboutCode", "Python · Django · React", "1,248", "blue"], ["Priya Nair", "Backend Developer", "52°North", "Python · Flask · PostGIS", "986", "violet"], ["Miguel Santos", "Full Stack Developer", "Accord Project", "JavaScript · Node.js · Vue", "845", "green"], ["Aisha Khan", "ML Engineer", "ASWF", "Python · TensorFlow · PyTorch", "712", "orange"], ["Liam O’Connor", "DevOps Engineer", "AerospaceResearch.net", "Go · Kubernetes · Terraform", "678", "cyan"], ["Sofia Petrova", "Technical Writer", "3DTK", "Docs · Markdown · Git", "589", "pink"]
];

export default function ContributorsPage() {
    const [query, setQuery] = useState(""); const [topic, setTopic] = useState("All"); const results = contributorData.filter(([name, , org, skills]) => (topic === "All" || skills.includes(topic)) && `${name} ${org} ${skills}`.toLowerCase().includes(query.toLowerCase())); return <main className="app-shell contributors-shell">
        <SiteHeader />
        <section className="contributors-header">
            <div>
                <h1>
                    Meet the Contributors
                </h1>
                <p>
                    The passionate people building, improving, and empowering open source.
                </p>
            </div>
            <div className="top-stats">
                <span>
                    <UsersRound />
                    15.8K+
                    <small>
                        Contributors
                    </small>
                </span>
                <span>
                    <Building2 />
                    522
                    <small>
                        Organizations
                    </small>
                </span>
                <span>
                    <Code2 />
                    2.1K
                    <small>
                        Projects
                    </small>
                </span>
            </div>
        </section>
        <div className="contributor-controls">
            <label className="search-input">
                <Search size={18} />
                <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search contributors..."
                />
            </label>
            <div className="filter-pills">
                {["All", "Python", "JavaScript", "Go", "Web", "DevOps", "Docs", "ML"].map((item) => <Pill active={topic === item} onClick={() => setTopic(item)} key={item}>{item}</Pill>)}
            </div>
        </div>
        <section className="contributors-grid">
            {results.map(([name, role, org, skills, score, color]) => <article key={name}><div className={`profile-avatar ${color}`}>{name.split(" ").map((part) => part[0]).join("")}</div><div className="contributor-card-title"><h2>{name}</h2><span>{role}</span></div><p><Building2 size={14} />{org}</p><div className="chips">{skills.split(" · ").map((skill) => <span key={skill}>{skill}</span>)}</div><footer><b><Star size={15} />{score} contributions</b><a href="#profile"><ExternalLink size={17} /></a></footer></article>)}
        </section>
        {!results.length && <div className="empty-state">No contributors match this sample filter.</div>}
    </main>;
}